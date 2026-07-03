// ./src/games/lander/scenes/worldCreator.ts

import { Mountain } from "../mountains/Mountain";
import { MOUNTAIN_DATABASE } from "../mountains/MountainBlueprints";

export class WorldCreator {
    /**
     * Spawns the sequential layout of the world map and counts the total landing pads.
     */
    public static createWorld(scene: Phaser.Scene): number {
        let currentX = 100;
        const groundY = 1000;
        let totalPads = 0;

        // Loop through the data blueprints directly
        for (const blueprint of MOUNTAIN_DATABASE) {
            const mountainInstance = new Mountain(blueprint);
            const spawnedPads = mountainInstance.spawn(scene, currentX, groundY);

            totalPads += spawnedPads.length;
            currentX += mountainInstance.width;
        }

        return totalPads;
    }
}