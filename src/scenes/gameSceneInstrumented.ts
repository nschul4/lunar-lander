import { GameScene } from "./gameScene";
import { drawMeasurementGrid } from "../games/lander/utils/gridOverlay";

export class GameSceneInstrumented extends GameScene {
  constructor() {
    super();
  }

  create(): void {
    // Re-map the scene manager's registration key identifier at runtime setup
    this.scene.key = "GameScene";

    super.create();            // 1. Boots everything production does (including camera setup)
    drawMeasurementGrid(this); // 2. Appends the developer grid overlay tools!
  }

  update(time: number, delta: number): void {
    super.update(time, delta); // Automatically runs production's camera tracking!
  }
}