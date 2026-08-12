import { Mountain } from "./mountain";
import { LEVEL_1_MOUNTAINS } from "./level1MountainBlueprints";
import type { MountainBlueprint } from "./mountainTypes";

export class WorldCreator {
  /**
   * Spawns the sequential layout of the world map and counts the total landing pads.
   */
  public static createWorld(
    scene: Phaser.Scene,
    mountains: MountainBlueprint[] = LEVEL_1_MOUNTAINS,
    groundY: number = 1000,
    startX: number = 0
  ): number {
    let currentX = startX;
    let totalPads = 0;
    // Loop through the data blueprints directly
    for (const blueprint of mountains) {
      const mountainInstance = new Mountain(blueprint);
      const spawnedObjects = mountainInstance.spawn(scene, currentX, groundY);
      const padCount = spawnedObjects.filter(
        obj => obj.name && obj.name !== "lander" && obj.name !== "thrust"
      ).length;

      totalPads += padCount;
      currentX += mountainInstance.width;
    }

    const bleed = 1000;
    const minX = startX - bleed;
    const totalWidth = (currentX - startX) + (bleed * 2);

    const solidHeight = 100;
    const gradientHeight = 300;

    const groundGraphics = scene.add.graphics();
    groundGraphics.setDepth(-0.1);

    // 1. Solid mountain gray block extending down from groundY
    groundGraphics.fillStyle(0x555555, 1);
    groundGraphics.fillRect(minX, groundY, totalWidth, solidHeight);

    // 2. Gradient fade block starting below the solid block
    groundGraphics.fillGradientStyle(0x555555, 0x555555, 0x000000, 0x000000, 1, 1, 1, 1);
    groundGraphics.fillRect(minX, groundY + solidHeight, totalWidth, gradientHeight);

    return totalPads;
  }
}