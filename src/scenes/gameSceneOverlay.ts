import { GameScene } from "./gameScene";
import { GameSceneController } from "./gameSceneController";

export class GameSceneOverlay extends Phaser.Scene {

  private gameScene: GameScene | null = null;
  private controllerScene: GameSceneController | null = null;

  private initialTime: number = 0;
  private lastStatusReportTime: number = 0;
  private finalTime: number | null = null;

  private text1!: Phaser.GameObjects.Text;
  private text2!: Phaser.GameObjects.Text;
  private failText!: Phaser.GameObjects.Text;
  private winText!: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "GameSceneOverlay",
      active: false,
    });
  }

  private createStatusReport(time: number): string {
    const lander = this.gameScene?.lander;

    // Default ground level reference matching world bounds height
    const GROUND_LEVEL = 1000;

    let altitude = 881 + 99;
    let velX = 99.99;
    let velY = 99.99;

    if (lander !== undefined) {
      // Invert Y calculation so altitude decreases as the lander drops toward ground (y = 1000)
      altitude = Math.max(0, GROUND_LEVEL - lander.y);
      velX = lander.getVelocityX();
      velY = lander.getVelocityY();
    }

    const verticalSpeed = Number(-(velY * 100).toFixed(0));
    const horizontalSpeed = Number((velX * 100).toFixed(0));

    let report = ""
      + "time: " + (time / 1000).toFixed(0)
      + "\n"
      + "landings: " + (this.gameScene?.successCount ?? 0) + "/" + (this.gameScene?.noOfSuccessesPossible ?? 0)
      + "\n"
      + "altitude: " + Number(altitude).toFixed(0);

    // Only append the speed section if either vertical or horizontal speed is non-zero
    if (verticalSpeed !== 0 || horizontalSpeed !== 0) {
      report += ""
        + "\n"
        + "speed:"
        + "\n"
        + "    vertical: "
        + verticalSpeed
        + "\n"
        + "  horizontal: "
        + horizontalSpeed;
    }

    return report;
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
    this.finalTime = null;
  }

  create(): void {
    this.gameScene = (<GameScene>this.scene.get('GameScene'));
    this.controllerScene = (<GameSceneController>this.scene.get('ControllerScene'));

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

    let elapsed = time - this.initialTime;

    if (this.gameScene?.gameOver) {
      // If the game just ended (win or loss), freeze time and freeze status overlay display
      if (this.finalTime === null) {
        this.finalTime = elapsed;
        this.text1.setText(this.createStatusReport(this.finalTime));
      }
      return;
    }

    if (time - this.lastStatusReportTime > 250) {
      this.text1.setText(this.createStatusReport(elapsed));
      this.lastStatusReportTime = time;
    }
    this.text2.setText(""
      + (this.controllerScene?.rotatingLeft == true ? "<" : " ")
      + (this.controllerScene?.thrusting == true ? "^" : " ")
      + (this.controllerScene?.rotatingRight == true ? ">" : " ")
    );
  }
}