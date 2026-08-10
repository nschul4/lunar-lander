import "phaser";
import { MountainBlueprint } from "./mountainTypes";

export class Mountain {
    public name: string;
    public width: number;
    public height: number;
    private vertices: Phaser.Math.Vector2[];
    private landingPads: any[];

    private static readonly DEFAULT_PAD_HEIGHT = 5;

    constructor(blueprint: MountainBlueprint) {
        this.name = blueprint.name;
        this.width = blueprint.width;
        this.height = blueprint.height;

        // Map native math vectors from bottom-up vertices
        this.vertices = blueprint.vertices.map(v => new Phaser.Math.Vector2(v.x, this.height - v.y));
        this.landingPads = blueprint.landingPads.map(pad => ({
            name: pad.name,
            startX: pad.startX,
            endX: pad.endX,
            width: pad.endX - pad.startX,
            y: pad.y,
            height: pad.height ?? Mountain.DEFAULT_PAD_HEIGHT
        }));
    }

    /**
     * Spawns mountain components and returns every created GameObject 
     * (polygons, text, etc.) so scenes can easily track and clean them up.
     */
    public spawn(scene: Phaser.Scene, worldX: number, worldY: number): Phaser.GameObjects.GameObject[] {
        const spawnedObjects: Phaser.GameObjects.GameObject[] = [];

        // 1. Create Mountain Polygon at origin initial point
        const mountainPolygon = scene.add.polygon(0, 0, this.vertices, 0x555555);
        scene.matter.add.gameObject(mountainPolygon, {
            shape: { type: 'fromVerts', verts: this.vertices, flagInternal: true },
            isStatic: true
        });
        spawnedObjects.push(mountainPolygon);

        const mountainBody = mountainPolygon.body as any;

        // 2. Translate body so min X aligns to worldX and max Y aligns to worldY (ground)
        const currentBottom = mountainBody.bounds.max.y;
        const currentLeft = mountainBody.bounds.min.x;
        const translationX = worldX - currentLeft;
        const translationY = worldY - currentBottom;

        mountainPolygon.setPosition(
            mountainPolygon.x + translationX,
            mountainPolygon.y + translationY
        );

        // 3. Spawn Landing Pads using bottom-up coordinate transformation
        for (const pad of this.landingPads) {
            const padW = pad.width;
            const padH = pad.height;

            // World X = Mountain baseline X + local pad startX + half pad width
            // World Y = Ground Y - local height Y + half pad height (sits flush on top)
            const targetPadCenterX = worldX + pad.startX + (padW / 2);
            const targetPadCenterY = worldY - pad.y + (padH / 2);

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
            spawnedObjects.push(padPolygon);

            const labelText = scene.add.text(
                targetPadCenterX,
                targetPadCenterY - (padH / 2) - 25,
                pad.name,
                { color: 'gray' }
            ).setOrigin(0.5, 0.5);

            spawnedObjects.push(labelText);
        }

        return spawnedObjects;
    }
}