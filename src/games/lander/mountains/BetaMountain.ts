import { Mountain } from "./Mountain";
import { LandingPadConfig } from "./LandingPad";

export class BetaMountain extends Mountain {
    name = "Beta";
    width = 400;

    // Direct instantiation of Vector2 objects avoids any Type mismatch errors
    vertices: Phaser.Math.Vector2[] = [
        new Phaser.Math.Vector2(0, 700),
        new Phaser.Math.Vector2(100, 300),
        new Phaser.Math.Vector2(200, 300),
        new Phaser.Math.Vector2(300, 0),
        new Phaser.Math.Vector2(400, 700),
    ];

     // Landing pads defined solely by a single top-left offset hook coordinate
    landingPads = [
        {
            name: "alpha-prime",
            position: new Phaser.Math.Vector2(100, 300) // Spawns a standardized 100px wide flat pad starting right here
        }
    ];
}