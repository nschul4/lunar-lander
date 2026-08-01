import { GameSceneOverlay } from "./gameSceneOverlay";
import { GameSceneController } from "./gameSceneController";
import { WorldCreator } from "../worldCreator";
import { Lander } from "../lander";
import { EnvironmentManager } from "../environmentManager";

export abstract class BaseGameScene extends Phaser.Scene {
  private static readonly GRAVITY_Y = 0.0065;

  private static readonly MAX_SAFE_HORIZONTAL_SPEED = 0.05;
  private static readonly MAX_SAFE_VERTICAL_SPEED = 0.4;
  private static readonly MAX_SAFE_ANGLE = 4;

  public lander!: Lander;
  protected controllerScene: any = null;
  protected gridGraphics!: Phaser.GameObjects.Graphics;
  protected environmentManager!: EnvironmentManager;

  public successCount: number = 0;
  public noOfSuccessesPossible: number = 0;

  public gameOver: boolean = false;

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

  protected fail() {
    this.gameOver = true;
    var overlayScene = (<GameSceneOverlay>this.scene.get('GameSceneOverlay'));
    overlayScene.fail();
    this.time.delayedCall(3000, () => {
      this.successCount = 0;
      this.gameOver = false;
      this.scene.restart();
      overlayScene.restart();
    }, [], this);
  }

  protected win() {
    this.gameOver = true;
    var overlayScene = (<GameSceneOverlay>this.scene.get('GameSceneOverlay'));
    overlayScene.win();
    this.time.delayedCall(7000, () => {
      this.successCount = 0;
      this.gameOver = false;
      this.scene.restart();
      overlayScene.restart();
    }, [], this);
  }

  create(): void {
    this.scene.bringToTop("GameSceneOverlay");
    this.controllerScene = (<GameSceneController>this.scene.get('ControllerScene'));

    this.environmentManager = new EnvironmentManager(this);

    // Layer 4: Instantiating player Lander Component
    this.lander = new Lander(this);
    this.matter.world.setBounds(0, 0, 3000, 1000);

    this.matter.world.on('collisionstart', (event: any) => {
      if (this.gameOver) {
        return;
      }

      for (const pair of event.pairs) {
        if (this.gameOver) {
          break;
        }

        const { bodyA, bodyB } = pair;

        // 1. Safe skip if either body is missing a Phaser Game Object mapping
        if (!bodyA?.gameObject || !bodyB?.gameObject) {
          continue;
        }

        let lander = null;
        let otherBody = null;

        if (bodyA.gameObject.name === "lander") {
          lander = bodyA;
          otherBody = bodyB;
        } else if (bodyB.gameObject.name === "lander") {
          lander = bodyB;
          otherBody = bodyA;
        }

        // 2. Safe skip if this specific collision pair does not involve the player lander
        if (lander === null || otherBody === null) {
          continue;
        }

        // 3. Process the lander collision mechanics
        if (otherBody.gameObject.name && otherBody.gameObject.name !== "lander" && otherBody.gameObject.name !== "thrust") {
          const landerObj = (lander.gameObject as any).lander
          const absAttitude = Math.abs(landerObj.angle);
          const vx = landerObj.getVelocityX();
          const vy = landerObj.getVelocityY();

          const isAngleSafe = absAttitude <= BaseGameScene.MAX_SAFE_ANGLE;
          const isHorizontalSafe = Math.abs(vx) <= BaseGameScene.MAX_SAFE_HORIZONTAL_SPEED;
          const isVerticalSafe = Math.abs(vy) <= BaseGameScene.MAX_SAFE_VERTICAL_SPEED;

          if (!isAngleSafe || !isHorizontalSafe || !isVerticalSafe) {
            this.fail();
          } else {
            landerObj.stop();

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

    this.lander.update(this.controllerScene);

    if (this.environmentManager) {
      this.environmentManager.update();
    }
  }
}