import { Mountain } from "./mountain";
import { MOUNTAIN_DATABASE } from "./mountainBlueprints";
import type { MountainBlueprint } from "./mountainBlueprints";

export class WorldCreator {
  /**
   * Spawns the sequential layout of the world map and counts the total landing pads.
   */
  public static createWorld(
    scene: Phaser.Scene,
    mountains: MountainBlueprint[] = MOUNTAIN_DATABASE,
    groundY: number = 1000
  ): number {
    let currentX = 0;
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