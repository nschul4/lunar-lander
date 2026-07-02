import { Mountain } from "./Mountain";
import { LandingPadConfig } from "./LandingPad";

export class BetaMountain extends Mountain {
    name = "Beta";
    width = 300;

    // Direct instantiation of Vector2 objects avoids any Type mismatch errors
    vertices: Phaser.Math.Vector2[] = [
        new Phaser.Math.Vector2(0, 300),
        new Phaser.Math.Vector2(100, 150),
        new Phaser.Math.Vector2(200, 150),
        new Phaser.Math.Vector2(300, 300)
    ];

    landingPads: LandingPadConfig[] = [
        { name: "Beta-1", localX: 100, localY: 150 }
    ];
}