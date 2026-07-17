import { GameScene } from "./gameScene";
import { drawMeasurementGrid } from "../gridOverlay";

export class GameSceneInstrumented extends GameScene {
  constructor() {
    super();
  }

  create(): void {
    super.create();
    drawMeasurementGrid(this);
  }

  update(time: number, delta: number): void {
    super.update(time, delta);
  }
}