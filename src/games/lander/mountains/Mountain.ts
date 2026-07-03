import "phaser";
import { LandingPadConfig } from "./LandingPad";

export abstract class Mountain {
    abstract name: string;
    abstract vertices: Phaser.Math.Vector2[];
    abstract landingPads: LandingPadConfig[];
    abstract width: number;

    private static readonly DEFAULT_PAD_WIDTH = 100;
    private static readonly DEFAULT_PAD_HEIGHT = 5;

    /**
     * Spawns the mountain and returns the created landing pads for scene tracking.
     */
    public spawn(scene: Phaser.Scene, worldX: number, worldY: number): Phaser.GameObjects.Polygon[] {
        const spawnedPads: Phaser.GameObjects.Polygon[] = [];

        // 1. Instantiating geometry
        const mountainPolygon = scene.add.polygon(0, 0, this.vertices, 0x555555);
        scene.matter.add.gameObject(mountainPolygon, {
            shape: { type: 'fromVerts', verts: this.vertices, flagInternal: true },
            isStatic: true
        });

        const mountainBody = mountainPolygon.body as any;

        // 2. Exact spatial translation adjustment
        const currentBottom = mountainBody.bounds.max.y;
        const translationX = worldX - mountainBody.bounds.min.x;
        const translationY = worldY - currentBottom;

        mountainPolygon.setPosition(
            mountainPolygon.x + translationX,
            mountainPolygon.y + translationY
        );

        // 3. Normalized Context for Sub-elements
        const mountainTopLeftX = mountainBody.bounds.min.x;
        const mountainTopLeftY = mountainBody.bounds.min.y;

        for (const pad of this.landingPads) {
            const padW = pad.width ?? Mountain.DEFAULT_PAD_WIDTH;
            const padH = pad.height ?? Mountain.DEFAULT_PAD_HEIGHT;

            const targetPadCenterX = mountainTopLeftX + pad.position.x + (padW / 2);
            const targetPadCenterY = mountainTopLeftY + pad.position.y + (padH / 2);

            const padVertices = [
                new Phaser.Math.Vector2(0, 0),
                new Phaser.Math.Vector2(padW, 0),
                new Phaser.Math.Vector2(padW, padH),
                new Phaser.Math.Vector2(0, padH)
            ];

            const padPolygon = scene.add.polygon(0, 0, padVertices, 0xaaaaaa);
            scene.matter.add.gameObject(padPolygon, {
                shape: { type: 'fromVerts', verts: padVertices, flagInternal: true },
                isStatic: true,
                position: { x: targetPadCenterX, y: targetPadCenterY }
            });

            padPolygon.setName(pad.name);

            scene.add.text(
                targetPadCenterX,
                targetPadCenterY - (padH / 2) - 25,
                pad.name,
                { color: 'gray' }
            ).setOrigin(0.5, 0.5);

            spawnedPads.push(padPolygon);
        }

        return spawnedPads;
    }
}