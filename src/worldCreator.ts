import { Mountain } from "./mountain";
import { MOUNTAIN_DATABASE } from "./mountainBlueprints";

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
            const spawnedObjects = mountainInstance.spawn(scene, currentX, groundY);

            // Filter out text labels and terrains by ensuring the element has a valid landing-pad name assignment
            const padCount = spawnedObjects.filter(obj => obj.name && obj.name !== "lander" && obj.name !== "thrust").length;

            totalPads += padCount;
            currentX += mountainInstance.width;
        }

        return totalPads;
    }
}