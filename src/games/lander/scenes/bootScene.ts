import { g_version } from "../version";

export class BootScene extends Phaser.Scene {

  private helloMessage: string = "lander v" + g_version + " foo";

  constructor() {
    super({
      key: "BootScene"
    });
  }

  preload(): void {
    // Fixed: Using root-relative pathing so assets load from any URL route
    this.load.setPath('/src/games/lander/assets/');
    // this.load.image('background', 'starfield.jpg');
    // this.load.image('background', 'starfield2.png');
    // this.load.image('background', 'starfield3.png');
    this.load.image('background', 'xxx.png');
  }

  create(): void {
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
    this.time.delayedCall(100, function () {
      this.scene.start("GameScene");
    },
      null,
      this,
    );
  }
}