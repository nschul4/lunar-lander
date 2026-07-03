export interface LandingPadConfig {
    name: string;
    /** Local coordinate relative to the mountain's defined (0,0) space */
    position: Phaser.Math.Vector2;
    /** Optional overrides; defaults to 100x5 if omitted */
    width?: number;
    height?: number;
}