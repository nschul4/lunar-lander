import { GameScene } from "./gameScene";
import { ControllerScene } from "./controllerScene";

export class GameSceneOverlay extends Phaser.Scene {

  private gameScene: GameScene | null = null;
  private controllerScene: ControllerScene | null = null;

  private initialTime: number = 0;
  private lastStatusReportTime: number = 0;

  private text1: Phaser.GameObjects.Text;
  private text2: Phaser.GameObjects.Text;
  private failText: Phaser.GameObjects.Text;
  private winText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "GameSceneOverlay",
      active: true,
    });
  }

  private createStatusReport(time: number): string {
    const lander = this.gameScene.lander;

    // Gracefully handle undefined state without mocking the raw Matter.js body
    let altitude = 881 + 99;
    let velX = 99.99;
    let velY = 99.99;

    if (lander !== undefined) {
      altitude = Math.abs(lander.y + 19);
      velX = lander.getVelocityX();
      velY = lander.getVelocityY();
    }

    return ""
      + "time: " + (time / 1000).toFixed(0)
      + "\n"
      + "landings: " + this.gameScene.successCount + "/" + this.gameScene.noOfSuccessesPossible
      + "\n"
      + "altitude: " + Number(altitude).toFixed(0)
      + "\n"
      + "speed:"
      + "\n"
      + "    vertical: "
      + Number(-(velY * 100).toFixed(0))
      + "\n"
      + "  horizontal: "
      + Number((velX * 100).toFixed(0))
      ;
  }

  public fail() {
    this.failText.setVisible(true);
  }

  public win() {
    this.winText.setVisible(true);
  }

  public restart() {
    this.scene.restart();
    this.initialTime = this.time.now;
  }

  create(): void {
    this.gameScene = (<GameScene>this.scene.get('GameScene'));
    this.controllerScene = (<ControllerScene>this.scene.get('ControllerScene'));

    var width: any = this.game.config.width;
    var height: any = this.game.config.height;

    this.text1 = this.add.text(
      10, 10,
      "",
      {
        fontSize: 32 + 'px',
        color: 'gray',
        strokeThickness: 1,
      },
    );

    this.text2 = this.add.text(
      width / 2, 10,
      "",
      {
        fontSize: 32 + 'px',
        color: 'gray',
        strokeThickness: 1,
      },
    );
    this.text2.setVisible(true);

    this.failText = this.add.text(
      width / 2, 100,
      "FAIL!",
      {
        fontSize: 64 + 'px',
        color: 'white',
        backgroundColor: 'red',
        strokeThickness: 1,
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 25,
        },
      }
    );
    this.failText.setOrigin();
    this.failText.setVisible(false);

    this.winText = this.add.text(
      width / 2, 100,
      "WIN!",
      {
        fontSize: 64 + 'px',
        color: 'white',
        backgroundColor: 'green',
        strokeThickness: 1,
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 25,
        },
      }
    );
    this.winText.setOrigin();
    this.winText.setVisible(false);
  }

  update(time: number, delta: number): void {
    if (time - this.lastStatusReportTime > 250) {
      this.text1.setText(this.createStatusReport(time - this.initialTime));
      this.lastStatusReportTime = time;
    }
    this.text2.setText(""
      + (this.controllerScene.rotatingLeft == true ? "<" : " ")
      + (this.controllerScene.thrusting == true ? "^" : " ")
      + (this.controllerScene.rotatingRight == true ? ">" : " ")
    );
  }
} 
