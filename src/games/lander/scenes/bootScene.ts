import { g_version } from "../game";

export class BootScene extends Phaser.Scene {

  private helloMessage: string = "lander v" + g_version;

  constructor() {
    super({
      key: "BootScene"
    });
  }

  preload(): void {
    // console.log("BootScene.preload");
    // Load assets
    this.load.setPath('./src/games/lander/assets/');
    // this.load.image('background', 'starfield.jpg');
  }

  create(): void {
    // console.log("BootScene.create");
    var width: any = this.game.config.width;
    var height: any = this.game.config.height;

    var text = this.add.text(
      width / 2, height / 2,
      this.helloMessage,
      {
        fontSize: 64 + "px",
        color: 'white',
        strokeThickness: 5,
      },
    );
    text.setOrigin();
  }

  update(): void {
    // console.log("BootScene.update");
    this.time.delayedCall(1000, function () {
      this.scene.start("GameScene");
    },
      null,
      this,
    );
  }
}
