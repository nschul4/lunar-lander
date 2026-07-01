interface Pad {
    name: string,
    g: Phaser.GameObjects.Graphics;
    color: number;
    tx: Phaser.Geom.Triangle;
}

export class Controller2 {

    private padMap: Map<string, Pad> = new Map();

    private keyNW: Phaser.Input.Keyboard.Key;
    private keyNE: Phaser.Input.Keyboard.Key;
    private keySW: Phaser.Input.Keyboard.Key;
    private keySE: Phaser.Input.Keyboard.Key;

    private blue: number = 0x0000ff;
    private green: number = 0x008800;

    private setupClickableTriangle(
        scene: Phaser.Scene,
        color: number,
        tx: Phaser.Geom.Triangle,
        callback: Function,
        name: string,
    ) {
        var g = scene.add.graphics();
        this.padMap.set(name, {
            name: name,
            g: g,
            color: color,
            tx: tx,
        });
        g.setName(name);
        g.setInteractive(tx, Phaser.Geom.Triangle.Contains);
        g.fillStyle(color, 0.5);
        g.fillTriangleShape(tx);
        g.on('pointerdown', function () {
            // console.log(name + ": down");
            this.setPadColorAllExceptOne(name);
            callback.call(scene);
        }, this);
        g.on('pointerup', function () {
            // console.log(name + ": up");
            this.resetAllButtonColors();
        }, this);
        g.on('pointermove', function () {
            // console.log(name + ": move");
        }, this);
    }

    private setPadColor(pad: Pad, color: number, alpha: number) {
        var g = pad.g;
        g.clear();
        g.fillStyle(color, alpha);
        g.fillTriangleShape(pad.tx);
    }

    private setPadColorAllExceptOne(exceptName: string) {
        for (let pad of Array.from(this.padMap.values())) {
            if (pad.name === exceptName) {
                this.setPadColor(pad, pad.color, 1);
            } else {
                this.setPadColor(pad, pad.color, 0.5);
            }
        }
    }

    private resetAllButtonColors() {
        for (let pad of Array.from(this.padMap.values())) {
            this.setPadColor(pad, pad.color, 0.5);
        }
    }

    ignore(camera: Phaser.Cameras.Scene2D.Camera) {
        for (let pad of Array.from(this.padMap.values())) {
            camera.ignore(pad.g);
        }
    }

    setPosition(x: number, y: number) {
        for (let pad of Array.from(this.padMap.values())) {
            pad.g.setPosition(x, y);
        }
    }

    create(
        scene: Phaser.Scene,
        width: number,
        height: number,
        callback1: Function,
        callback2: Function,
        callback3: Function,
        callback4: Function,
    ): void {

        scene.input.addPointer(6);

        var triangleNW = new Phaser.Geom.Triangle(
            width / 2, 0, // center top
            0, height, // left bottom
            0, 0, // left top
        );
        var triangleSW = new Phaser.Geom.Triangle(
            width / 2, 0, // center top
            width / 2, height, // center bottom
            0, height, // left bottom
        );
        var triangleSE = new Phaser.Geom.Triangle(
            width / 2, 0, // center top
            width, height, // right bottom
            width / 2, height, // center bottom
        );
        var triangleNE = new Phaser.Geom.Triangle(
            width / 2, 0, // center top
            width, 0, //  right top
            width, height, // left bottom
        );

        this.keyNW = scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.A
        );
        this.keySW = scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.Z
        );
        this.keySE = scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.C
        );
        this.keyNE = scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.D
        );

        this.setupClickableTriangle(
            scene, this.green, triangleNW, callback1, "triangleNW"
        );
        this.setupClickableTriangle(
            scene, this.blue, triangleSW, callback2, "triangleSW"
        );
        this.setupClickableTriangle(
            scene, this.green, triangleSE, callback3, "triangleSE"
        );
        this.setupClickableTriangle(
            scene, this.blue, triangleNE, callback4, "triangleNE"
        );

        this.keyNW.on('down', callback1);
        this.keySW.on('down', callback2);
        this.keySE.on('down', callback3);
        this.keyNE.on('down', callback4);
    }
}
