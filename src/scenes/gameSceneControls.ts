import "phaser";

export class GameSceneControls extends Phaser.Scene {
  private nextSceneKey: string = "GameScene"; // Default fallback

  constructor() {
    super({ key: "ControlsScene" });
  }

  // Phaser automatically passes scene data here
  init(data?: { nextScene?: string }): void {
    if (data?.nextScene) {
      this.nextSceneKey = data.nextScene;
    }
  }

  create(): void {
    const width = Number(this.game.config.width);
    const height = Number(this.game.config.height);

    // Title
    this.add.text(width / 2, 80, "CONTROLS", {
      fontSize: "48px",
      color: "#ffffff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    // Keyboard Controls Section
    this.add.text(width / 2, 180, "Keyboard Controls", {
      fontSize: "28px",
      color: "#00ff00",
      fontStyle: "bold"
    }).setOrigin(0.5);

    const keyboardInstructions = [
      "LEFT ARROW - Rotate Left",
      "RIGHT ARROW - Rotate Right",
      "UP ARROW - Main Thruster"
    ];

    keyboardInstructions.forEach((text, index) => {
      this.add.text(width / 2, 230 + index * 35, text, {
        fontSize: "20px",
        color: "#dddddd",
        fontFamily: "monospace"
      }).setOrigin(0.5);
    });

    // Touch/Mouse Overlay Section
    this.add.text(width / 2, 400, "Touch / Screen Click Regions", {
      fontSize: "28px",
      color: "#00ff00",
      fontStyle: "bold"
    }).setOrigin(0.5);

    const touchInstructions = [
      "Left 1/3 Screen - Rotate Left",
      "Center 1/3 Screen - Main Thruster",
      "Right 1/3 Screen - Rotate Right"
    ];

    touchInstructions.forEach((text, index) => {
      this.add.text(width / 2, 450 + index * 35, text, {
        fontSize: "20px",
        color: "#dddddd",
        fontFamily: "monospace"
      }).setOrigin(0.5);
    });

    // Prompt to advance
    const startText = this.add.text(width / 2, 620, "PRESS ANY KEY OR CLICK TO START", {
      fontSize: "24px",
      color: "#ffff00",
      fontStyle: "bold"
    }).setOrigin(0.5);

    // Flashing effect for start prompt
    this.tweens.add({
      targets: startText,
      alpha: 0.2,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Listen for input to start the target game scene
    this.input.keyboard?.once("keydown", () => this.startGame());
    this.input.once("pointerdown", () => this.startGame());
  }

  private startGame(): void {
    this.scene.start(this.nextSceneKey);
  }
}