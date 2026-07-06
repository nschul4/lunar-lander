import { GameSceneOverlay } from "./gameSceneOverlay";
import { ControllerScene } from "./controllerScene";
import { WorldCreator } from "./worldCreator";

export abstract class BaseGameScene extends Phaser.Scene {
  public lander: any;
  protected controllerScene: any = null;
  protected thrust: any;

  protected worldBoundsRectangleColorTop: number = 0x555555;
  protected worldBoundsRectangleColorBottom: number = 0x555555;
  protected worldBoundsRectangleColorLeft: number = 0x555555;
  protected worldBoundsRectangleColorRight: number = 0x555555;

  protected background: Phaser.GameObjects.TileSprite;
  public successCount: number = 0;
  public noOfSuccessesPossible: number = 0;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  public pause() {
    this.scene.pause();
  }

  protected objectToString(target: any): string {
    var result: string = "";
    Object.getOwnPropertyNames(target).forEach(
      (name) => {
        result += " ";
        result += name;
        result += ": ";
        result += target[name];
        result += ",\n";
      }
    );
    return "{\n" + result + "}";
  }

  protected setupLander(): void {
    var xLeft: number = 0;
    var xMiddle: number = 20;
    var xRight: number = 40;

    var yTop: number = 0;
    var yMiddle: number = 30;
    var yBottom: number = 40;

    var landerPoints: string = ""
      + xLeft + " " + yBottom // left
      + " "
      + xMiddle + " " + yMiddle // center
      + " "
      + xRight + " " + yBottom // right
      + " "
      + xMiddle + " " + yTop // peak
      ;

    var xRight2: number = xRight;
    var xMiddle2: number = xMiddle;
    var xLeft2: number = xLeft;

    var mysteryShifter = -12;
    var yTop2: number = yMiddle + mysteryShifter;
    var yMiddle2: number = yBottom + mysteryShifter;
    var yBottom2: number = yBottom + mysteryShifter + 10;

    var thrustFlamePoints: string = ""
      + xLeft2 + " " + yMiddle2 // left
      + " "
      + xMiddle2 + " " + yBottom2 // center
      + " "
      + xRight2 + " " + yMiddle2 // right
      + " "
      + xMiddle2 + " " + yTop2 // peak
      ;

    this.lander = this.add.polygon(0, 0, landerPoints, 0x999999);
    this.matter.add.gameObject(
      this.lander,
      {
        shape: {
          type: 'fromVerts',
          verts: landerPoints,
          flagInternal: true
        }
      }
    );

    this.lander.angle = -90;
    this.lander.setPosition(100, 200);
    this.lander.setVelocityX(1);
    this.lander.setFrictionAir(0);
    this.lander.setBounce(0, 0);

    this.lander.setName("lander");

    this.thrust = this.add.polygon(
      this.lander.x,
      this.lander.y,
      thrustFlamePoints,
      0xffffff
    );
    this.thrust.setName("thrust");
  }

  protected fail() {
    var overlayScene = (<GameSceneOverlay>this.scene.get('GameSceneOverlay'));
    overlayScene.fail();
    this.time.delayedCall(3000, function () {
      this.successCount = 0;
      this.scene.restart();
      overlayScene.restart();
    }, null, this);
  }

  protected win() {
    var overlayScene = (<GameSceneOverlay>this.scene.get('GameSceneOverlay'));
    overlayScene.win();
    this.time.delayedCall(7000, function () {
      this.successCount = 0;
      this.scene.restart();
      overlayScene.restart();
    }, null, this);
  }

  create(): void {
    this.scene.bringToTop("GameSceneOverlay");
    this.controllerScene = (<ControllerScene>this.scene.get('ControllerScene'));

    this.setupLander();

    this.matter.world.setBounds(0, 0, 3000, 1000);

    this.matter.world.on('collisionstart', (event: any, bodyA: any, bodyB: any) => {
      // If either body doesn't map to a GameObject (like world bounds), handle as an out-of-bounds crash safely
      if (!bodyA || !bodyB || !bodyA.gameObject || !bodyB.gameObject) {
        this.fail();
        return;
      }

      var lander = null;
      var landingPad = null;

      if (bodyA.gameObject.name === "lander") {
        lander = bodyA;
        landingPad = bodyB;
      } else if (bodyB.gameObject.name === "lander") {
        lander = bodyB;
        landingPad = bodyA;
      }

      // If the lander hit something that isn't designated as a landing pad (e.g. raw mountain geometry)
      if (lander !== null && (!landingPad.gameObject || !landingPad.gameObject.name)) {
        this.fail();
        return;
      }

      if (lander !== null && landingPad !== null) {
        var absAttitude = Math.abs(lander.gameObject.angle);
        if (absAttitude > 5) {
          this.fail();
        } else {
          var vx = lander.gameObject.body.velocity.x;
          var vy = lander.gameObject.body.velocity.y;
          if (vx > 1 || vy > 1) {
            this.fail();
          } else {
            lander.gameObject.angle = 0;
            this.lander.setVelocity(0, 0);
            if (landingPad.gameObject.landed !== true) {
              landingPad.gameObject.landed = true;
              landingPad.gameObject.setFillStyle(0x00aa00);
              this.successCount += 1;
              if (this.successCount === this.noOfSuccessesPossible) {
                this.win();
              }
            }
          }
        }
      }
    }, this);

    this.matter.world.setGravity(0, 0.005);
    this.noOfSuccessesPossible = WorldCreator.createWorld(this);
  }

  update(time: number, delta: number): void {
    // Step the physics engine at a constant fixed 30 FPS rate (1000ms / 30 = 33.33ms)
    this.matter.world.step(33.33);

    if (this.controllerScene.thrusting == true) {
      this.thrust.visible = true;
      var radians = Phaser.Math.DegToRad(this.lander.angle);
      
      // Forces are scaled to balance out the longer step period
      var forceX: number = 0.000075 * Math.sin(radians);
      var forceY: number = -0.000075 * Math.cos(radians);

      this.matter.body.applyForce(this.lander.body, this.lander.body.position, {
        x: forceX,
        y: forceY
      });
    } else {
      this.thrust.visible = false;
    }

    // Set constant angular rotations balanced for 33.33ms steps
    this.lander.setAngularVelocity(0);
    if (this.controllerScene.rotatingLeft == true) {
      this.lander.setAngularVelocity(-0.03);
    }
    if (this.controllerScene.rotatingRight == true) {
      this.lander.setAngularVelocity(0.03);
    }

    this.thrust.x = this.lander.x;
    this.thrust.y = this.lander.y;
    this.thrust.angle = this.lander.angle;
  }
}