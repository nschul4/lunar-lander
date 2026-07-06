import { BaseGameScene } from "./baseGameScene";

export class GameScene extends BaseGameScene {
  constructor() {
    super({
      key: "GameScene"
    });
  }

  create(): void {
    super.create();
    this.cameras.main.setZoom(1);
  }

  update(time: number, delta: number): void {
    super.update(time, delta);

    // 1. Calculate the ideal camera center position
    const targetCamX = this.lander.x - this.cameras.main.width / 2;
    const targetCamY = this.lander.y - this.cameras.main.height / 2;

    // 2. Find the current distance between the camera and that ideal center
    const distX = Math.abs(this.cameras.main.scrollX - targetCamX);
    const distY = Math.abs(this.cameras.main.scrollY - targetCamY);

    // 3. Scale your lerp factor based on the distance
    const dynamicLerpX = distX > 100 ? 0.15 : 0.05;
    const dynamicLerpY = distY > 100 ? 0.15 : 0.05;

    // 4. Apply the scroll
    this.cameras.main.scrollX += (targetCamX - this.cameras.main.scrollX) * dynamicLerpX;
    this.cameras.main.scrollY += (targetCamY - this.cameras.main.scrollY) * dynamicLerpY;
  }
}