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
        // 1. Create the visual polygon at (0, 0) using local vertices
        const mountainPolygon = scene.add.polygon(0, 0, this.vertices, 0x555555);

        // 2. Pair it with a Matter body instantly. 
        // Matter will auto-center both the physics vertices and the visual polygon together.
        scene.matter.add.gameObject(mountainPolygon, {
            shape: {
                type: 'fromVerts',
                verts: this.vertices,
                flagInternal: true
            },
            isStatic: true
        });

        const mountainBody = mountainPolygon.body as any;

        // 3. Leverage worldX and worldY for the translation:
        // Find where the bottom of the unified physics box is right now
        const currentBottom = mountainBody.bounds.max.y;
        
        // Calculate the exact world adjustments needed
        const translationX = worldX - mountainBody.bounds.min.x;
        const translationY = worldY - currentBottom;

        // Translate the entire synchronized GameObject to its final world home
        mountainPolygon.setPosition(
            mountainPolygon.x + translationX,
            mountainPolygon.y + translationY
        );

        // 4. Spawn landing pads using the newly updated, perfectly locked bounds
        for (const pad of this.landingPads) {
            const localX = pad.position.x;
            const localY = pad.position.y;

            const padVertices = [
                new Phaser.Math.Vector2(0, 0),
                new Phaser.Math.Vector2(Mountain.PAD_WIDTH, 0),
                new Phaser.Math.Vector2(Mountain.PAD_WIDTH, Mountain.PAD_HEIGHT),
                new Phaser.Math.Vector2(0, Mountain.PAD_HEIGHT)
            ];

            const finalMountainBounds = mountainBody.bounds;
            const mountainTopLeftX = finalMountainBounds.min.x;
            const mountainTopLeftY = finalMountainBounds.min.y;

            const targetPadCenterX = mountainTopLeftX + localX + (Mountain.PAD_WIDTH / 2);
            const targetPadCenterY = mountainTopLeftY + localY + (Mountain.PAD_HEIGHT / 2);

            const padPolygon = scene.add.polygon(0, 0, padVertices, 0xaaaaaa);

            scene.matter.add.gameObject(padPolygon, {
                shape: {
                    type: 'fromVerts',
                    verts: padVertices,
                    flagInternal: true
                },
                isStatic: true,
                position: { x: targetPadCenterX, y: targetPadCenterY }
            });

            padPolygon.setName(pad.name);

            scene.add.text(
                targetPadCenterX,
                targetPadCenterY - (Mountain.PAD_HEIGHT / 2) - 25,
                pad.name,
                { color: 'gray' }
            ).setOrigin(0.5, 0.5);

            if ('noOfSuccessesPossible' in scene) {
                (scene as any).noOfSuccessesPossible += 1;
            }
        }
    }
}