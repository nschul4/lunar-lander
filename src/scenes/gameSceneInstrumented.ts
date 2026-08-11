import { GameScene } from "./gameScene";
import { drawMeasurementGrid } from "../gridOverlay";
import { getLevelFromUrl } from "../levelUtil";
import { LevelBlueprint } from "../levelBlueprints";

export class GameSceneInstrumented extends GameScene {
  constructor() {
    super();
  }

  init(data?: { levelIndex?: number; level?: LevelBlueprint }): void {
    if (data?.level || data?.levelIndex !== undefined) {
      super.init(data);
    } else {
      const { level } = getLevelFromUrl();
      super.init({ level });
    }
  }

  create(): void {
    super.create();
    drawMeasurementGrid(this, this.worldWidth, this.worldHeight);
  }

  update(time: number, delta: number): void {
    super.update(time, delta);
  }
}