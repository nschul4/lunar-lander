// ./src/games/lander/mountains/MountAlpha.ts

import { Mountain } from "./Mountain";

export class MountAlpha extends Mountain {
    name = "Alpha";
    width = 500;

    // Mountain peak coordinates
    vertices: Phaser.Math.Vector2[] = [
        new Phaser.Math.Vector2(0, 300),
        new Phaser.Math.Vector2(200, 0),
        new Phaser.Math.Vector2(300, 0),
        new Phaser.Math.Vector2(500, 300),
    ];

    // Landing pads defined solely by a single top-left offset hook coordinate
    landingPads = [
        {
            name: "alpha-prime",
            position: new Phaser.Math.Vector2(250, 0) // Spawns a standardized 100px wide flat pad starting right here
        }
    ];
}