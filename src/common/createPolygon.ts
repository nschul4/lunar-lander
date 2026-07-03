export function createPolygon(
    scene: Phaser.Scene,
    points: string,
    x: number,
    y: number,
    fillColor: number,
    isStatic: boolean,
): Phaser.GameObjects.Polygon {
    var polygon = scene.add.polygon(0, 0, points, fillColor);
    var gameObject: any = scene.matter.add.gameObject(
        polygon,
        {
            shape: {
                type: 'fromVerts',
                verts: points,
                flagInternal: true
            },
            isStatic: isStatic,
        }
    );
    
    // Set absolute position directly
    gameObject.setPosition(x, y);
    return gameObject;
}
