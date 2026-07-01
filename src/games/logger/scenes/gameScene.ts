import { Logger } from "../../../common/classes/logger";

export class GameScene extends Phaser.Scene {

  private text: Phaser.GameObjects.Text;

  private lastWidth: number = 0;
  private lastHeight: number = 0;

  constructor() {
    super({
      key: "GameScene"
    });
    Logger.log("GameScene.constructor");
  }

  private widthOrHeightHasChanged(): string {

    var result: string = "";

    var width: any = this.game.config.width;
    var height: any = this.game.config.height;

    if (width != this.lastWidth || height != this.lastHeight) {
      this.lastWidth = width;
      this.lastHeight = height;

      result += "width=" + width;
      result += ", height=" + height;

      return result;
    }

    return null;
  }

  public handlePointerAction(event, pointer) {
    var widthAndHeight: string = this.widthOrHeightHasChanged();
    if (widthAndHeight == null) {
      Logger.log(
        event + " (x=" + pointer.x.toFixed(2) + ",y=" + pointer.y.toFixed(2) + ")"
      );
    } else {
      Logger.log(
        event + " (x=" + pointer.x.toFixed(2) + ",y=" + pointer.y.toFixed(2) + "), " + widthAndHeight
      );
    }
  }

  create(): void {
    Logger.log("GameScene.create");
    this.text = this.add.text(
      0, 0,
      "",
      {
        // fontSize: '12px',
        fontSize: '24px',
        // fontSize: '64px',
        // strokeThickness: 2,
      }
    );
  }

  update(time: number): void {
    this.text.setText(Logger.getLog());
    // var textBounds = this.text.getBounds();
    // this.cameras.main.centerOn(textBounds.width / 2, textBounds.height / 2);
  }
}
