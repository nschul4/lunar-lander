import { BaseGameScene } from "./baseGameScene";

export class GameSceneTest extends BaseGameScene {
  constructor() {
    super({
      key: "GameScene"
    });
  }

  create(): void {
    super.create();
    this.cameras.main.centerOn(1500, 500);
    this.cameras.main.setZoom(0.45);
  }

  update(time: number, delta: number): void {
    super.update(time, delta);
  }
}