import "phaser";
import { LANDER_VERTICES } from "./configs/landerConfig";

export class LanderGrid {
  private graphics: Phaser.GameObjects.Graphics;
  private labels: Phaser.GameObjects.Text[] = [];
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.graphics = scene.add.graphics();
  }

  /**
   * Draws a local grid centered on the lander's pivot origin.
   */
  public render(x: number, y: number, angle: number): void {
    this.graphics.clear();
    this.clearLabels();

    // Setup transformation configuration matching the physical target
    this.graphics.lineStyle(1, 0x00ffff, 0.4);

    const rad = Phaser.Math.DegToRad(angle);
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    // Helper to transform local coordinates into the active rotated world space
    const transform = (localX: number, localY: number) => {
      return {
        worldX: x + (localX * cos - localY * sin),
        worldY: y + (localX * sin + localY * cos)
      };
    };

    // 1. Draw Axis Reference Grid Lines (-40px to +40px around origin)
    const gridSize = 40;
    const step = 10;

    for (let i = -gridSize; i <= gridSize; i += step) {
      // Horizontal lines across the local space
      const left = transform(-gridSize, i);
      const right = transform(gridSize, i);
      this.graphics.lineBetween(left.worldX, left.worldY, right.worldX, right.worldY);

      // Vertical lines across the local space
      const top = transform(i, -gridSize);
      const bottom = transform(i, gridSize);
      this.graphics.lineBetween(top.worldX, top.worldY, bottom.worldX, bottom.worldY);
    }

    // 2. Draw Highly visible primary X/Y Axis vectors
    this.graphics.lineStyle(2, 0xff00ff, 0.8);
    const origin = transform(0, 0);
    const xAxisEnd = transform(30, 0);
    const yAxisEnd = transform(0, 30);
    this.graphics.lineBetween(origin.worldX, origin.worldY, xAxisEnd.worldX, xAxisEnd.worldY);
    this.graphics.lineBetween(origin.worldX, origin.worldY, yAxisEnd.worldX, yAxisEnd.worldY);

    // 3. Render specific text markers precisely matching polygon vertices
    for (let k = 0; k < LANDER_VERTICES.length; k += 2) {
      const vx = LANDER_VERTICES[k];
      const vy = LANDER_VERTICES[k + 1];
      const worldPos = transform(vx, vy);

      const label = this.scene.add.text(worldPos.worldX + 5, worldPos.worldY + 5, `(${vx},${vy})`, {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#ffff00',
        backgroundColor: '#000000ba'
      }).setDepth(this.graphics.depth + 1);

      this.labels.push(label);
    }
  }

  public setDepth(depth: number): void {
    this.graphics.setDepth(depth);
  }

  /**
   * Sets visibility. Clears underlying graphics pipelines and elements if turned off.
   */
  public setVisible(visible: boolean): void {
    if (this.graphics.visible !== visible) {
      this.graphics.visible = visible;
      if (!visible) {
        this.graphics.clear();
        this.clearLabels();
      }
    }
  }

  public destroy(): void {
    this.graphics.destroy();
    this.clearLabels();
  }

  private clearLabels(): void {
    this.labels.forEach(l => l.destroy());
    this.labels = [];
  }
}