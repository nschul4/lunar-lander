import { Mountain } from "../mountains/Mountain";
import { MountAlpha } from "../mountains/MountAlpha";
import { BetaMountain } from "../mountains/BetaMountain";

export class WorldCreator {
    /**
     * Spawns the sequential layout of the world map and counts the total landing pads.
     * 
     * @param scene The active Phaser Scene where the environment is built.
     * @returns The combined total number of landing pads generated across all mountains.
     */
    public static createWorld(scene: Phaser.Scene): number {
        const terrainSequence: Mountain[] = [
            new MountAlpha()
        ];

        let currentX = 400;
        const groundY = 400;
        let totalPads = 0;

        for (const mountain of terrainSequence) {
            // Spawn the individual mountain segment
            mountain.spawn(scene, currentX, groundY);
            
            // Accumulate the number of landing pads inside this segment
            totalPads += mountain.landingPads.length;
            
            // Push the horizontal coordinate marker forward by this mountain's width
            currentX += mountain.width;
        }

        // Return the total target count back to your GameScene configuration
        return totalPads;
    }
}