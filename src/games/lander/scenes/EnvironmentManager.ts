// EnvironmentManager.ts
import { BACKGROUND_RANGES_DATABASE, MountainRangeBlueprint } from "./MountainRangeBlueprints";

export class EnvironmentManager {
  private scene: Phaser.Scene;
  private backgroundStarfield: Phaser.GameObjects.TileSprite;
  private activeRanges: { sprite: Phaser.GameObjects.TileSprite; factor: number }[] = [];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.createLayers();
  }

  private createLayers(): void {
    // 1. Core deep space backdrop
    this.backgroundStarfield = this.scene.add.tileSprite(-1000, -400, 4000, 1400, 'background')
      .setOrigin(0, 0)
      .setDepth(-3);

    // 2. Loop through background mountain range data blueprints dynamically
    for (const blueprint of BACKGROUND_RANGES_DATABASE) {
      this.generateRangeTexture(blueprint);

      const sprite = this.scene.add.tileSprite(
        blueprint.tileX,
        blueprint.tileY,
        blueprint.tileWidth,
        blueprint.tileHeight,
        blueprint.key
      ).setOrigin(0, 0).setDepth(blueprint.depth);

      this.activeRanges.push({ sprite, factor: blueprint.parallaxFactor });
    }
  }

  private generateRangeTexture(blueprint: MountainRangeBlueprint): void {
    if (this.scene.textures.exists(blueprint.key)) return;

    const g = this.scene.make.graphics({ x: 0, y: 0 });
    const nativePoints = blueprint.vertices.map(v => new Phaser.Math.Vector2(v.x, blueprint.textureHeight - v.y));

    g.fillStyle(blueprint.color, 1);
    g.beginPath();

    if (nativePoints.length > 0) {
      g.moveTo(nativePoints[0].x, nativePoints[0].y);
      for (let i = 1; i < nativePoints.length; i++) {
        g.lineTo(nativePoints[i].x, nativePoints[i].y);
      }
    }

    g.closePath();
    g.fillPath();
    g.generateTexture(blueprint.key, blueprint.textureWidth, blueprint.textureHeight);
  }

  /**
   * Updates parallax scroll relative to the main camera framework
   */
  public update(): void {
    const camX = this.scene.cameras.main.scrollX;
    const camY = this.scene.cameras.main.scrollY;

    // Un-comment and handle the starfield background parallax here!
    // this.backgroundStarfield.tilePositionX = camX * 0.1;
    // this.backgroundStarfield.tilePositionY = camY * 0.1;

    // Handles the mountain ranges loop below it
    for (const range of this.activeRanges) {
      range.sprite.tilePositionX = camX * range.factor;
      range.sprite.tilePositionY = camY * range.factor;
    }
  }
}