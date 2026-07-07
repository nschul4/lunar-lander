import { GameSceneOverlay } from "./gameSceneOverlay";
import { ControllerScene } from "./controllerScene";
import { WorldCreator } from "./worldCreator";

export abstract class BaseGameScene extends Phaser.Scene {
  private static readonly GRAVITY_Y = 0.007;
  private static readonly THRUST_FORCE = 0.00002;
  private static readonly ROTATION_SPEED = 0.01;

  private static readonly MAX_SAFE_HORIZONTAL_SPEED = 0.05;
  private static readonly MAX_SAFE_VERTICAL_SPEED = 0.4;
  private static readonly MAX_SAFE_ANGLE = 4;

  public lander: any;
  protected controllerScene: any = null;
  protected thrust: any;

  protected worldBoundsRectangleColorTop: number = 0x555555;
  protected worldBoundsRectangleColorBottom: number = 0x555555;
  protected worldBoundsRectangleColorLeft: number = 0x555555;
  protected worldBoundsRectangleColorRight: number = 0x555555;

  protected background: Phaser.GameObjects.TileSprite;
  protected mountainParallax: Phaser.GameObjects.TileSprite;
  protected gridGraphics: Phaser.GameObjects.Graphics;
  
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
    this.lander.setVelocityX(1.5);
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

  /**
   * Generates a simple continuous jagged texture to serve as a background mountain range
   */
  protected generateMountainTexture(): void {
    if (this.textures.exists('parallax_mountains')) return;

    const width = 1440;
    const height = 400;
    const g = this.make.graphics({ x: 0, y: 0 });

    // Draw a dark silhouette ridge line
    g.fillStyle(0x222226, 1);
    g.beginPath();
    g.moveTo(0, height);
    g.lineTo(0, 180);
    g.lineTo(250, 80);
    g.lineTo(500, 240);
    g.lineTo(750, 120);
    g.lineTo(1100, 290);
    g.lineTo(1440, 150);
    g.lineTo(1440, height);
    g.closePath();
    g.fillPath();

    g.generateTexture('parallax_mountains', width, height);
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

    // Layer 1: Deep space background starfield
    this.background = this.add.tileSprite(1500, 500, 3000, 1000, 'background');
    this.background.setDepth(-2);

    // Layer 2: Midground parallax mountain range
    this.generateMountainTexture();
    this.mountainParallax = this.add.tileSprite(1500, 800, 3000, 400, 'parallax_mountains');
    this.mountainParallax.setDepth(-1);

    // Layer 3: Player Lander & Map structures (Grid removed entirely from baseline)
    this.setupLander();

    this.matter.world.setBounds(0, 0, 3000, 1000);

    this.matter.world.on('collisionstart', (event: any, bodyA: any, bodyB: any) => {
      if (!bodyA || !bodyB || !bodyA.gameObject || !bodyB.gameObject) {
        this.fail();
        return;
      }

      var lander = null;
      var otherBody = null;

      if (bodyA.gameObject.name === "lander") {
        lander = bodyA;
        otherBody = bodyB;
      } else if (bodyB.gameObject.name === "lander") {
        lander = bodyB;
        otherBody = bodyA;
      }

      if (lander !== null && otherBody !== null) {
        if (otherBody.gameObject.name && otherBody.gameObject.name !== "lander" && otherBody.gameObject.name !== "thrust") {
          var absAttitude = Math.abs(lander.gameObject.angle);
          var vx = lander.gameObject.body.velocity.x;
          var vy = lander.gameObject.body.velocity.y;

          const isAngleSafe = absAttitude <= BaseGameScene.MAX_SAFE_ANGLE;
          const isHorizontalSafe = Math.abs(vx) <= BaseGameScene.MAX_SAFE_HORIZONTAL_SPEED;
          const isVerticalSafe = Math.abs(vy) <= BaseGameScene.MAX_SAFE_VERTICAL_SPEED;

          console.log(
            `--- TOUCHDOWN DIAGNOSTICS ---\n` +
            `Angle:      ${absAttitude.toFixed(2)}° (Max: ${BaseGameScene.MAX_SAFE_ANGLE}°) -> ${isAngleSafe ? '✅ PASS' : '❌ FAIL'}\n` +
            `Horiz Vel:  ${vx.toFixed(4)} (Max Abs: ${BaseGameScene.MAX_SAFE_HORIZONTAL_SPEED}) -> ${isHorizontalSafe ? '✅ PASS' : '❌ FAIL'}\n` +
            `Vert Vel:   ${vy.toFixed(4)} (Max Abs: ${BaseGameScene.MAX_SAFE_VERTICAL_SPEED}) -> ${isVerticalSafe ? '✅ PASS' : '❌ FAIL'}\n` +
            `-----------------------------`
          );

          if (!isAngleSafe || !isHorizontalSafe || !isVerticalSafe) {
            this.fail();
          } else {
            lander.gameObject.angle = 0;
            this.lander.setVelocity(0, 0);
            if (otherBody.gameObject.landed !== true) {
              otherBody.gameObject.landed = true;
              otherBody.gameObject.setFillStyle(0x00aa00);
              this.successCount += 1;
              if (this.successCount === this.noOfSuccessesPossible) {
                this.win();
              }
            }
          }
        } else {
          console.log("💥 CRASH: Touched raw mountain terrain, not a landing pad.");
          this.fail();
        }
      }
    }, this);

    this.matter.world.setGravity(0, BaseGameScene.GRAVITY_Y);
    this.noOfSuccessesPossible = WorldCreator.createWorld(this);
  }

  update(time: number, delta: number): void {
    if (this.controllerScene.thrusting == true) {
      this.thrust.visible = true;
      var radians = Phaser.Math.DegToRad(this.lander.angle);

      var forceX: number = BaseGameScene.THRUST_FORCE * Math.sin(radians);
      var forceY: number = -BaseGameScene.THRUST_FORCE * Math.cos(radians);

      this.matter.body.applyForce(this.lander.body, this.lander.body.position, {
        x: forceX,
        y: forceY
      });
    } else {
      this.thrust.visible = false;
    }

    this.lander.setAngularVelocity(0);
    if (this.controllerScene.rotatingLeft == true) {
      this.lander.setAngularVelocity(-BaseGameScene.ROTATION_SPEED);
    }
    if (this.controllerScene.rotatingRight == true) {
      this.lander.setAngularVelocity(BaseGameScene.ROTATION_SPEED);
    }

    this.thrust.x = this.lander.x;
    this.thrust.y = this.lander.y;
    this.thrust.angle = this.lander.angle;

    if (this.background) {
      this.background.tilePositionX = this.cameras.main.scrollX * 0.15;
      this.background.tilePositionY = this.cameras.main.scrollY * 0.15;
    }

    if (this.mountainParallax) {
      this.mountainParallax.tilePositionX = this.cameras.main.scrollX * 0.45;
    }
  }
}