import { GameScene } from "./gameScene";

export class ControllerScene extends Phaser.Scene {

  public thrusting: boolean = false;
  public rotatingLeft: boolean = false;
  public rotatingRight: boolean = false;

  private gameScene: GameScene = null;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private escKeyObj: Phaser.Input.Keyboard.Key;

  private oneThirdHeight: number;
  private twoThirdsHeight: number;
  private oneThirdWidth: number;
  private oneHalfWidth: number;
  private twoThirdsWidth: number;

  constructor() {
    super({
      key: "ControllerScene",
      active: true,
    });
  }

  create(): void {
    var width: number = <number>this.game.config.width;
    var height: number = <number>this.game.config.height;

    this.oneThirdHeight = Math.floor(height / 3);
    this.twoThirdsHeight = Math.floor((height * 2) / 3);
    this.oneThirdWidth = Math.floor(width / 3);
    this.oneHalfWidth = Math.floor(width / 2);
    this.twoThirdsWidth = Math.floor((width * 2) / 3);

    this.input.addPointer(1);

    this.gameScene = (<GameScene>this.scene.get('GameScene'));
    this.cursors = this.input.keyboard.createCursorKeys();
    this.escKeyObj = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  private isPointingLeft(pointer: Phaser.Input.Pointer): boolean {
    return pointer.x < this.oneThirdWidth;
  }

  private isPointingRight(pointer: Phaser.Input.Pointer): boolean {
    return pointer.x > this.twoThirdsWidth;
  }

  private isThrusting(pointer: Phaser.Input.Pointer): boolean {
    return pointer.x >= this.oneThirdWidth && pointer.x <= this.twoThirdsWidth;
  }

  update(): void {

    this.thrusting = this.cursors.up.isDown
      ||
      (this.input.mousePointer.isDown && this.isThrusting(this.input.mousePointer))
      ||
      (this.input.pointer1.isDown && this.isThrusting(this.input.pointer1))
      ||
      (this.input.pointer2.isDown && this.isThrusting(this.input.pointer2))
      ;

    this.rotatingLeft = this.cursors.left.isDown
      ||
      (this.input.mousePointer.isDown && this.isPointingLeft(this.input.mousePointer))
      ||
      (this.input.pointer1.isDown && this.isPointingLeft(this.input.pointer1))
      ||
      (this.input.pointer2.isDown && this.isPointingLeft(this.input.pointer2))
      ;

    this.rotatingRight = this.cursors.right.isDown
      ||
      (this.input.mousePointer.isDown && this.isPointingRight(this.input.mousePointer))
      ||
      (this.input.pointer1.isDown && this.isPointingRight(this.input.pointer1))
      ||
      (this.input.pointer2.isDown && this.isPointingRight(this.input.pointer2))
      ;

    if (this.escKeyObj.isDown) {
      this.gameScene.pause();
    }
  }
}
