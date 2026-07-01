import { Logger } from "../../../common/classes/logger";
import { GameScene } from "./gameScene";

export class ControllerScene extends Phaser.Scene {

  constructor() {
    super({
      key: "ControllerScene",
      active: true,
    });
    Logger.log("ControllerScene.constructor");
  }

  create(): void {
    Logger.log("ControllerScene.create");

    var gameScene = (<GameScene>this.scene.get('GameScene'));

    this.input.on('pointerdown', function (pointer) {
      this.isPointerDown = true;
      gameScene.handlePointerAction("pointerdown", pointer);
    }, this);

    this.input.on('pointerup', function (pointer) {
      this.isPointerDown = false;
      gameScene.handlePointerAction("pointerup", pointer);
    }, this);

    this.input.on('pointermove', function (pointer) {
      if (this.isPointerDown) {
        gameScene.handlePointerAction("pointermove", pointer);
      }
    }, this);
  }
}
