import { GameSceneController } from "./gameSceneController";
import { GameSceneOverlay } from "./gameSceneOverlay";
import { WorldCreator } from "../worldCreator";
import { Lander } from "../lander";
import { EnvironmentManager } from "../environmentManager";
import { LevelBlueprint, LEVELS } from "../levelBlueprints";

export abstract class BaseGameScene extends Phaser.Scene {
  private static readonly MAX_SAFE_HORIZONTAL_SPEED = 0.05;
  private static readonly MAX_SAFE_VERTICAL_SPEED = 0.4;
  private static readonly MAX_SAFE_ANGLE = 4;

  public worldWidth: number = 3000;
  public worldHeight: number = 1000;
  public gravityY: number = 0.006;
  public startX: number = 0;

  public currentLevelIndex: number = 0;
  protected level: LevelBlueprint = LEVELS[0];

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

  init(data?: { levelIndex?: number; level?: LevelBlueprint }): void {
    if (data?.levelIndex !== undefined && LEVELS[data.levelIndex]) {
      this.currentLevelIndex = data.levelIndex;
      this.level = LEVELS[data.levelIndex];
    } else if (data?.level) {
      this.level = data.level;
      const foundIdx = LEVELS.findIndex(l => l.id === data.level?.id);
      this.currentLevelIndex = foundIdx !== -1 ? foundIdx : 0;
    } else {
      this.currentLevelIndex = 0;
      this.level = LEVELS[0];
    }
  }

  public pause(): void {
    this.scene.pause();
    this.scene.pause("GameSceneOverlay");
  }

  protected objectToString(obj: any): string {
    return `[${obj.type || 'Object'} @ (${obj.x?.toFixed(1) || 0}, ${obj.y?.toFixed(1) || 0})]`;
  }

  protected fail(): void {
    if (this.gameOver) return;
    this.gameOver = true;

    console.log("💥 CRASH DETECTED!");
    const overlayScene = <GameSceneOverlay>this.scene.get('GameSceneOverlay');
    if (overlayScene) {
      overlayScene.fail();
    }

    this.time.delayedCall(3000, () => {
      this.successCount = 0;
      this.gameOver = false;
      this.scene.restart({ levelIndex: this.currentLevelIndex });
      if (overlayScene) {
        overlayScene.restart();
      }
    });
  }

  protected win(): void {
    if (this.gameOver) return;
    this.gameOver = true;

    console.log("🎉 MISSION SUCCESS: ALL PADS CLEARED!");
    const overlayScene = <GameSceneOverlay>this.scene.get('GameSceneOverlay');
    if (overlayScene) {
      overlayScene.win();
    }

    this.time.delayedCall(7000, () => {
      this.successCount = 0;
      this.gameOver = false;
      const nextIndex = (this.currentLevelIndex + 1) % LEVELS.length;
      this.scene.restart({ levelIndex: nextIndex });
      if (overlayScene) {
        overlayScene.restart();
      }
    });
  }

  create(): void {
    this.gameOver = false;
    this.successCount = 0;

    if (!this.scene.isActive("GameSceneOverlay")) {
      this.scene.launch("GameSceneOverlay");
    }

    this.scene.bringToTop("GameSceneOverlay");
    this.controllerScene = (<GameSceneController>this.scene.get('ControllerScene'));

    this.startX = this.level.startX ?? 0;
    this.worldWidth = this.level.worldWidth;
    this.worldHeight = this.level.worldHeight;
    this.gravityY = this.level.gravityY ?? 0.006;

    // 1. Environment (Backgrounds & Starfield)
    this.environmentManager = new EnvironmentManager(
      this,
      this.level.backgroundRanges,
      this.startX,
      this.worldWidth,
      this.worldHeight
    );

    // 2. Lander initial position & physics state
    this.lander = new Lander(this, this.level.spawnPosition);

    // 3. Terrain & Landing Pads (starts at negative offset to populate bleed area)
    this.noOfSuccessesPossible = WorldCreator.createWorld(
      this,
      this.level.mountains,
      this.worldHeight,
      this.startX
    );

    // 4. World Physics Bounds & Gravity (left wall stays anchored at x = 0)
    this.matter.world.setBounds(0, 0, this.worldWidth, this.worldHeight);
    this.matter.world.setGravity(0, this.gravityY);

    // 5. Draw subtle dashed boundary lines at playable world borders (x = 0 and x = worldWidth)
    /*
    const boundaryGraphics = this.add.graphics();
    boundaryGraphics.setDepth(11);
    const boundaryColor = 0x5c6b73;
    const boundaryAlpha = 0.4;
    const dashLength = 8;
    const gapLength = 6;
    boundaryGraphics.lineStyle(2, boundaryColor, boundaryAlpha);
    const boundaryXPositions = [0, this.worldWidth];
    for (const xPos of boundaryXPositions) {
      for (let y = 0; y < this.worldHeight; y += dashLength + gapLength) {
        const dashEnd = Math.min(y + dashLength, this.worldHeight);
        boundaryGraphics.lineBetween(xPos, y, xPos, dashEnd);
      }
    }
    */

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
          const landerObj = (lander.gameObject as any).lander;
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
  }

  update(time: number, delta: number): void {
    if (!this.gameOver && this.lander) {
      this.lander.update(this.controllerScene);
    }

    if (this.environmentManager) {
      this.environmentManager.update();
    }
  }
}