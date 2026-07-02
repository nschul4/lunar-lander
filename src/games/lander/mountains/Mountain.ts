// ./src/games/lander/mountains/Mountain.ts

import "phaser";
import { LandingPadConfig } from "./LandingPad";

export abstract class Mountain {
    abstract name: string;
    abstract vertices: Phaser.Math.Vector2[];
    abstract landingPads: LandingPadConfig[];
    abstract width: number;

    // Global uniform landing pad dimensions
    private static readonly PAD_WIDTH = 100;
    private static readonly PAD_HEIGHT = 5;

    public spawn(scene: Phaser.Scene, worldX: number, worldY: number): void {
        // 1. Create the visual mountain polygon at the target coordinates
        const mountainPolygon = scene.add.polygon(worldX, worldY, this.vertices, 0x555555);

        // 2. Inject Matter physics via shape config so Phaser automatically syncs the center of mass and graphics origin
        scene.matter.add.gameObject(mountainPolygon, {
            shape: {
                type: 'fromVerts',
                verts: this.vertices,
                flagInternal: true
            },
            isStatic: true
        });

        // 3. Spawn uniformly-sized landing pads relative to the mountain's aligned structural bounds
        for (const pad of this.landingPads) {
            const localX = pad.position.x;
            const localY = pad.position.y;

            // Define the landing pad local vertices relative to its own local origin (0,0)
            const padVertices = [
                new Phaser.Math.Vector2(0, 0),
                new Phaser.Math.Vector2(Mountain.PAD_WIDTH, 0),
                new Phaser.Math.Vector2(Mountain.PAD_WIDTH, Mountain.PAD_HEIGHT),
                new Phaser.Math.Vector2(0, Mountain.PAD_HEIGHT)
            ];

            // Matter shifted the mountain's coordinate space to its center of mass.
            // We use the updated physics bounds min property as the absolute coordinate anchor.
            const bounds = (mountainPolygon.body as any).bounds;
            const absolutePadX = bounds.min.x + localX;
            const absolutePadY = bounds.min.y + localY;

            // Create the visual pad shape
            const padPolygon = scene.add.polygon(absolutePadX, absolutePadY, padVertices, 0xaaaaaa);
            
            // Inject Matter physics for the pad, ensuring flawless graphics/physics matching
            scene.matter.add.gameObject(padPolygon, {
                shape: {
                    type: 'fromVerts',
                    verts: padVertices,
                    flagInternal: true
                },
                isStatic: true
            });
            padPolygon.setName(pad.name);

            // Place text labels perfectly centered right above the flat landing pad strip
            scene.add.text(
                absolutePadX + (Mountain.PAD_WIDTH / 2),
                absolutePadY - 25,
                pad.name,
                { color: 'gray' }
            ).setOrigin(0.5, 0.5);

            if ('noOfSuccessesPossible' in scene) {
                (scene as any).noOfSuccessesPossible += 1;
            }
        }
    }
}