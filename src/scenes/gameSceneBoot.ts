import { g_version } from "../version";
import starfieldImg from "../assets/starfield2.png";

export class GameSceneBoot extends Phaser.Scene {
  private helloMessage: string = "lander v" + g_version;
  private nextSceneKey: string;

  constructor(config?: { key?: string; nextScene?: string }) {
    super({
      key: config?.key ?? "BootScene",
    });
    this.nextSceneKey = config?.nextScene ?? "ControlsScene";
  }

  preload(): void {
    this.load.image("background", starfieldImg);
  }

  create(): void {
    var width: any = this.game.config.width;
    var height: any = this.game.config.height;

    var text = this.add.text(width / 2, height / 2, this.helloMessage, {
      fontSize: 64 + "px",
      color: "white",
      strokeThickness: 5,
    });
    text.setOrigin();
  }

  update(): void {
    this.time.delayedCall(
      500,
      () => {
        this.scene.start(this.nextSceneKey);
      },
      [],
      this
    );
  }
}
