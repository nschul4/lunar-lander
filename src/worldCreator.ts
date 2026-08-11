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

    return totalPads;
  }
}