import { BaseGameScene } from "./baseGameScene";
import { drawMeasurementGrid } from "../gridOverlay";
import { getLevelFromUrl } from "../levelUtil";

export class GameSceneOverview extends BaseGameScene {
  constructor() {
    super({ key: "GameScene" });
  }

  init(): void {
    const { level } = getLevelFromUrl();
    super.init({ level });
  }

  create(): void {
    super.create();
    const bleedRight = Math.abs(this.startX);
    drawMeasurementGrid(this, this.worldWidth, this.worldHeight, this.startX, bleedRight);

    // Explicitly overrides standard tracking to give a fixed global bird's-eye layout
    this.cameras.main.centerOn(this.worldWidth / 2, this.worldHeight / 2);
    this.cameras.main.setZoom(0.45);
  }

  update(time: number, delta: number): void {
    // Intentionally bypasses camera tracking to preserve the global map test view
    super.update(time, delta);
  }
}