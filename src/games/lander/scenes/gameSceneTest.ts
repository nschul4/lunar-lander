import { GameSceneOverlay } from "./gameSceneOverlay";
import { ControllerScene } from "./controllerScene";
import { WorldCreator } from "./worldCreator";

export class GameSceneTest extends Phaser.Scene {

  public lander: any;

  private controllerScene = null;

  private thrust: any;

  private worldBoundsRectangleColorTop: number = 0x550055;
  private worldBoundsRectangleColorBottom: number = 0x555555;
  private worldBoundsRectangleColorLeft: number = 0x555555;
  private worldBoundsRectangleColorRight: number = 0x555555;

  // TODO: give these a more specific type
  private background: Phaser.GameObjects.TileSprite;
  private successCount: number = 0;
  private noOfSuccessesPossible: number = 0;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  /**
   * TODO: is this necessary?
   */
  public pause() {
    this.scene.pause();
  }

  private objectToString(target: any): string {
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

  private setupLander(): void {
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

    var thrustFlamePints: string = ""
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
      thrustFlamePints,
      0xffffff
    );
    this.thrust.setName("thrust");
  }

  private fail() {
    var overlayScene = (<GameSceneOverlay>this.scene.get('GameSceneOverlay'));
    overlayScene.fail();
    this.time.delayedCall(3000, function () {
      this.successCount = 0;
      this.scene.restart();
      overlayScene.restart();
    }, null, this);
  }

  private win() {
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

    var width: any = this.game.config.width;
    var height: any = this.game.config.height;

    this.matter.world.setBounds(0, 0, 3000, 1000);

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
      if (bodyB.gameObject == null || !bodyB.gameObject.name) {
        this.fail();
      } else {
        var lander = null;
        var landingPad = null;
        // console.log(bodyA.gameObject.name);
        // console.log(bodyB.gameObject.name);
        if (bodyA.gameObject.name == "lander") {
          lander = bodyA;
          landingPad = bodyB;
        } else if (bodyB.gameObject.name == "lander") {
          lander = bodyB;
          landingPad = bodyA;
        }
        if (lander == null) {
          // console.log(bodyA.gameObject.name + "," + bodyB.gameObject.name);
        } else {
          var absAttitude = Math.abs(lander.gameObject.angle);
          if (absAttitude > 5) {
            // console.log("fail: attitude: " + absAttitude);
            this.fail();
          } else {
            var vx = lander.gameObject.body.velocity.x;
            var vy = lander.gameObject.body.velocity.y;
            if (vx > 1) {
              // console.log("fail: vx: " + vx.toFixed(2));
              this.fail();
            } else if (vy > 1) {
              // console.log("fail: vy: " + vy.toFixed(2));
              this.fail();
            } else {
              // console.log(""
              //   + "success: "
              //   + "attitude: " + absAttitude.toFixed(2)
              //   + ", vx: " + vx.toFixed(2)
              //   + ", vy:" + vy.toFixed(2)
              // );
              lander.gameObject.angle = 0;
              this.lander.setVelocity(0, 0);
              if (landingPad.gameObject.landed !== true) {
                landingPad.gameObject.landed = true;
                landingPad.gameObject.setFillStyle(0x00aa00);
                this.successCount += 1;
                if (this.successCount == this.noOfSuccessesPossible) {
                  this.win();
                }
              }
            }
          }
        }
      }
    }, this);

    this.matter.world.setGravity(0, 0.005);

    this.noOfSuccessesPossible = WorldCreator.createWorld(this);

    this.cameras.main.centerOn(1500, 500);
    this.cameras.main.setZoom(0.45);
  }

  update(time: number, delta: number): void {

    var width: any = this.game.config.width;
    var height: any = this.game.config.height;

    if (this.controllerScene.thrusting == true) {
      this.thrust.visible = true;
      var radians = Phaser.Math.DegToRad(this.lander.angle);
      var vx: number = 0.0075 * Math.sin(radians);
      var vy: number = -0.0075 * Math.cos(radians);
      this.lander.setVelocityX(this.lander.body.velocity.x + vx);
      this.lander.setVelocityY(this.lander.body.velocity.y + vy);
    } else {
      this.thrust.visible = false;
    }

    this.lander.setAngularVelocity(0);
    if (this.controllerScene.rotatingLeft == true) {
      this.lander.setAngularVelocity(-0.01);
    }
    if (this.controllerScene.rotatingRight == true) {
      this.lander.setAngularVelocity(0.01);
    }

    this.thrust.x = this.lander.x;
    this.thrust.y = this.lander.y;
    this.thrust.angle = this.lander.angle;
  }
}
