import { createPolygon } from "../../../common/createPolygon";

export class WorldCreator {

    private static createLandingPad(
        scene: Phaser.Scene,
        name: string,
        x: number, y: number
    ): Phaser.GameObjects.Polygon {
        var polygon = createPolygon(
            scene,
            "0 0 50 0 50 2 0 2",
            x, y,
            0xaaaaaa,
            true
        );
        polygon.setName(name);
        scene.add.text(x, y - 60, name,
            {
                color: 'gray',
            },
        );
        return polygon;
    }

    private static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    public static createWorld(
        scene: Phaser.Scene,
    ): number {

        var horizontalOffset: number = 300;
        var noOfSuccessesPossible: number = 0;

        var arrayOfNumbers = [0, 1, 2, 3, 4, 5];

        // test values
        // arrayOfNumbers = [0, 0, 0, 0, 0, 0];
        // arrayOfNumbers = [1, 1, 1, 1, 1, 1];
        // arrayOfNumbers = [2, 2, 2, 2, 2, 2];
        // arrayOfNumbers = [3, 3, 3, 3, 3, 3];
        // arrayOfNumbers = [4, 4, 4, 4, 4, 4];

        for (var i: number = 0; i < 6; ++i) {
            var j: number = this.getRandomInt(arrayOfNumbers.length);
            var k: number = arrayOfNumbers[j];
            arrayOfNumbers.splice(j, 1);
            switch (k % 5) {

                case 0:
                    createPolygon(scene, ''
                        + '0 450'
                        + ' '
                        + '50 0'
                        + ' '
                        + '100 100'
                        + ' '
                        + '150 150'
                        + ' '
                        + '200 450'
                        ,
                        horizontalOffset,
                        0,
                        0x555555,
                        true
                    );

                    WorldCreator.createLandingPad(
                        scene,
                        "alpha",
                        horizontalOffset + 200, 0
                    );
                    noOfSuccessesPossible += 1;

                    horizontalOffset += 250;
                    break;

                case 1:
                    createPolygon(scene, ''
                        + '0 400'
                        + ' '
                        + '50 50'
                        + ' '
                        + '100 0'
                        + ' '
                        + '200 180'
                        + ' '
                        + '250 200'
                        + ' '
                        + '300 300'
                        + ' '
                        + '350 350'
                        + ' '
                        + '400 350'
                        + ' '
                        + '450 400'
                        ,
                        horizontalOffset, 0,
                        0x555555,
                        true
                    );

                    WorldCreator.createLandingPad(
                        scene,
                        "beta",
                        horizontalOffset + 350, -50
                    );
                    noOfSuccessesPossible += 1;

                    horizontalOffset += 500;
                    break;

                case 2:
                    createPolygon(scene, ''
                        + '0 350'
                        + ' '
                        + '50 125'
                        + ' '
                        + '125 0'
                        + ' '
                        + '200 200'
                        + ' '
                        + '250 250'
                        + ' '
                        + '300 150'
                        + ' '
                        + '350 150'
                        + ' '
                        + '400 300'
                        + ' '
                        + '500 350'
                        ,
                        horizontalOffset, 0,
                        0x555555, true
                    );

                    WorldCreator.createLandingPad(
                        scene,
                        "epsilon",
                        horizontalOffset + 300, -200
                    );
                    noOfSuccessesPossible += 1;

                    horizontalOffset += 525;
                    break;

                case 3:
                    createPolygon(scene, ''
                        + '0 250'
                        + ' '
                        + '50 150'
                        + ' '
                        + '100 200'
                        + ' '
                        + '150 00'
                        + ' '
                        + '200 200'
                        + ' '
                        + '250 250'
                        , horizontalOffset, 0,
                        0x555555,
                        true
                    );

                    WorldCreator.createLandingPad(
                        scene,
                        "delta",
                        horizontalOffset + 250, 0
                    );
                    noOfSuccessesPossible += 1;

                    horizontalOffset += 400;
                    break;

                case 4:
                    createPolygon(scene, ''
                        + '0 500'
                        + ' '
                        + '50 150'
                        + ' '
                        + '100 250'
                        + ' '
                        + '150 00'
                        + ' '
                        + '200 150'
                        + ' '
                        + '250 150'
                        + ' '
                        + '300 500'
                        , horizontalOffset, 0,
                        0x555555,
                        true
                    );

                    WorldCreator.createLandingPad(
                        scene,
                        "tranquility base",
                        horizontalOffset + 200, -350
                    );
                    noOfSuccessesPossible += 1;

                    WorldCreator.createLandingPad(
                        scene,
                        "gamma",
                        horizontalOffset + 300, 0
                    );
                    noOfSuccessesPossible += 1;

                    horizontalOffset += 350;
                    break;
            }
        }
        return noOfSuccessesPossible;
    }
}
