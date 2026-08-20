import { BACKGROUND_RANGES_DATABASE, MountainRangeBlueprint } from "./mountainRangeBlueprints";

export class EnvironmentManager {
  private scene: Phaser.Scene;
  private backgroundStarfield!: Phaser.GameObjects.TileSprite;
  private activeRanges: { sprite: Phaser.GameObjects.TileSprite; factor: number }[] = [];

  constructor(
    scene: Phaser.Scene,
    ranges: MountainRangeBlueprint[] = BACKGROUND_RANGES_DATABASE,
    minX: number = 0,
    worldWidth: number = 3000,
    worldHeight: number = 1000,
    bleedRight: number = 500
  ) {
    this.scene = scene;
    this.createLayers(ranges, minX, worldWidth, worldHeight, bleedRight);
  }

  private createLayers(
    ranges: MountainRangeBlueprint[],
    minX: number,
    worldWidth: number,
    worldHeight: number,
    bleedRight: number
  ): void {
    const totalWidth = worldWidth - minX + bleedRight;

    // 1. Core deep space backdrop
    this.backgroundStarfield = this.scene.add
      .tileSprite(minX, 0, totalWidth, worldHeight, "background")
      .setOrigin(0, 0)
      .setDepth(-3);

    // 2. Parallax mountain ranges
    for (const blueprint of ranges) {
      this.generateRangeTexture(blueprint);

      const sprite = this.scene.add
        .tileSprite(
          minX + blueprint.tileX,
          worldHeight,
          totalWidth,
          blueprint.tileHeight,
          blueprint.key
        )
        .setOrigin(0, 1)
        .setDepth(blueprint.depth);

      this.activeRanges.push({ sprite, factor: blueprint.parallaxFactor });
    }
  }

  private generateRangeTexture(blueprint: MountainRangeBlueprint): void {
    if (this.scene.textures.exists(blueprint.key)) return;

    const g = this.scene.make.graphics({ x: 0, y: 0 });
    const nativePoints = blueprint.vertices.map(
      (v) => new Phaser.Math.Vector2(v.x, blueprint.textureHeight - v.y)
    );

    g.fillStyle(blueprint.color, 1);
    g.beginPath();

    if (nativePoints.length > 0) {
      g.moveTo(nativePoints[0].x, nativePoints[0].y);
      for (let i = 1; i < nativePoints.length; i++) {
        g.lineTo(nativePoints[i].x, nativePoints[i].y);
      }
      // Seal path flush down to bottom right and bottom left edges
      g.lineTo(blueprint.textureWidth, blueprint.textureHeight);
      g.lineTo(0, blueprint.textureHeight);
    }

    g.closePath();
    g.fillPath();
    g.generateTexture(blueprint.key, blueprint.textureWidth, blueprint.textureHeight);
    g.destroy();
  }

  /**
   * Updates parallax scroll relative to the main camera framework
   */
  public update(): void {
    const camX = this.scene.cameras.main.scrollX;

    // Scroll X position for horizontal parallax while locking Y to ground level
    for (const range of this.activeRanges) {
      range.sprite.tilePositionX = camX * range.factor;
    }
  }
}
