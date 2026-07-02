export class GameSceneGrid extends Phaser.Scene {
  private gridGraphics: Phaser.GameObjects.Graphics;
  private mainScene: Phaser.Scene;

  constructor() {
    super({
      key: "GameSceneGrid",
      active: true
    });
  }

  create(): void {
    // Reference the main game scene to track its viewport
    this.mainScene = this.scene.get('GameScene');

    this.gridGraphics = this.add.graphics();
    this.drawGrid();
  }

  private drawGrid(): void {
    const worldWidth = 10000;
    const worldMinY = -5000;
    const worldMaxY = 5000;
    const step = 100;

    // Make lines thicker (2px or 3px) so they don't get aliased away when zoomed out
    this.gridGraphics.lineStyle(3, 0x00ff00, 0.4);

    // Vertical Lines & X Labels
    for (let x = 0; x <= worldWidth; x += step) {
      this.gridGraphics.lineBetween(x, worldMinY, x, worldMaxY);

      // Increased font size to 28px so it scales down beautifully
      this.add.text(x + 10, -35, `X:${x}`, {
        fontSize: '28px',
        color: '#00ff00',
        fontStyle: 'bold'
      }).setAlpha(0.7);
    }

    // Horizontal Lines & Y Labels
    for (let y = worldMinY; y <= worldMaxY; y += step) {
      this.gridGraphics.lineBetween(0, y, worldWidth, y);
      if (y !== 0) {
        // Increased font size here as well
        this.add.text(10, y + 10, `Y:${y}`, {
          fontSize: '28px',
          color: '#00ff00',
          fontStyle: 'bold'
        }).setAlpha(0.7);
      }
    }
  }

  update(): void {
    // Keep the grid perfectly aligned with the active camera[cite: 1]
    if (this.mainScene && this.mainScene.cameras.main) {
      const mainCam = this.mainScene.cameras.main;
      this.cameras.main.scrollX = mainCam.scrollX;
      this.cameras.main.scrollY = mainCam.scrollY;
      this.cameras.main.zoom = mainCam.zoom;
    }
  }
}