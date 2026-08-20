import { BaseGameScene } from "./baseGameScene";

export class GameScene extends BaseGameScene {
  constructor() {
    super({ key: "GameScene" });
  }

  create(): void {
    super.create(); // Boots core game mechanics natively
    this.cameras.main.setZoom(1.3);
    if (this.lander) {
      this.cameras.main.scrollX = this.lander.x - this.cameras.main.width / 2;
      this.cameras.main.scrollY = this.lander.y - this.cameras.main.height / 2;
    }
  }

  update(time: number, delta: number): void {
    super.update(time, delta);

    // Halt camera tracking if game is over or lander is unmounted
    if (this.gameOver || !this.lander) return;

    const targetCamX = this.lander.x - this.cameras.main.width / 2;
    const targetCamY = this.lander.y - this.cameras.main.height / 2;

    const distX = Math.abs(this.cameras.main.scrollX - targetCamX);
    const distY = Math.abs(this.cameras.main.scrollY - targetCamY);

    const dynamicLerpX = distX > 100 ? 0.15 : 0.05;
    const dynamicLerpY = distY > 100 ? 0.15 : 0.05;

    this.cameras.main.scrollX += (targetCamX - this.cameras.main.scrollX) * dynamicLerpX;
    this.cameras.main.scrollY += (targetCamY - this.cameras.main.scrollY) * dynamicLerpY;
  }
}
