import { Logger } from "../../../common/classes/logger";

export class BootScene extends Phaser.Scene {

  constructor() {
    super({
      key: "BootScene"
    });
  }

  preload(): void {
    Logger.log("BootScene.preload");
    this.load.setPath('./src/games/logger/assets/');
    // Load assets
  }

  update(): void {
    this.scene.start("GameScene");
  }
}
