export class Controller1 {

    private gArray: Phaser.GameObjects.Graphics[] = [];

    private keyNW: Phaser.Input.Keyboard.Key;
    private keyNE: Phaser.Input.Keyboard.Key;
    private keySW: Phaser.Input.Keyboard.Key;
    private keySE: Phaser.Input.Keyboard.Key;
    private keyN: Phaser.Input.Keyboard.Key;

    private setupClickableTriangle(
        scene: Phaser.Scene,
        show: boolean,
        color: number,
        tx: Phaser.Geom.Triangle,
        callback: Function
    ) {
        var g = scene.add.graphics();
        this.gArray.push(g);
        if (show) {
            g.fillStyle(color);
        } else {
            g.fillStyle(color, 0);
        }
        g.fillTriangleShape(tx);
        g.setInteractive(tx, Phaser.Geom.Triangle.Contains);
        g.on('pointerdown', function () {
            callback.call(scene);
        }, this);
    }

    ignore(camera: Phaser.Cameras.Scene2D.Camera) {
        for (var i = 0; i < this.gArray.length; ++i) {
            camera.ignore(this.gArray[i]);
        }
    }

    setPosition(x: number, y: number) {
        for (var i = 0; i < this.gArray.length; ++i) {
            this.gArray[i].setPosition(x, y);
        }
    }

    create(
        scene: Phaser.Scene,
        width: number,
        height: number,
        showTriangles: boolean,
        callback1: Function,
        callback2: Function,
        callback3: Function,
        callback4: Function,
        callback5: Function,
    ): void {
        var t1 = new Phaser.Geom.Triangle(
            width / 2, height / 2, // center
            width / 2, height, // lower middle
            0, height, // lower left
        );
        var t2 = new Phaser.Geom.Triangle(
            width / 2, height / 2, // center
            width, height, // lower right
            width / 2, height, // lower middle
        );
        var t3 = new Phaser.Geom.Triangle(
            width / 2, height / 2, // center
            0, height, // lower left
            0, 0, // upper left
        );
        var t4 = new Phaser.Geom.Triangle(
            width / 2, height / 2, // center
            width, 0, // upper right
            width, height, // lower left
        );
        var t5 = new Phaser.Geom.Triangle(
            width / 2, height / 2, // center
            0, 0, // upper left
            width, 0, // upper right
        );

        this.setupClickableTriangle(
            scene, showTriangles, 0x0000ff, t1, callback1
        );
        this.setupClickableTriangle(
            scene, showTriangles, 0x00ff00, t2, callback2
        );
        this.setupClickableTriangle(
            scene, showTriangles, 0x00ff00, t3, callback3
        );
        this.setupClickableTriangle(
            scene, showTriangles, 0x0000ff, t4, callback4
        );
        this.setupClickableTriangle(
            scene, showTriangles, 0xff0000, t5, callback5
        );

        this.keyNW = scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.A
        );
        this.keySW = scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.Z
        );

        this.keyNE = scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.D
        );
        this.keySE = scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.C
        );

        this.keyN = scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.S
        );

        this.keyNW.on('down', callback3, scene);
        this.keyNE.on('down', callback4, scene);

        this.keySW.on('down', callback1, scene);
        this.keySE.on('down', callback2, scene);

        this.keyN.on('down', callback5, scene);
    }
}
