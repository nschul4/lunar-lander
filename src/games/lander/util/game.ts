import "phaser";
import { GameSceneGrid } from "../scenes/GameSceneGrid";
import { MountainDesignerScene } from "../scenes/mountainDesignerScene";

var width: number = 1440;
var height: number = 720;

const config = {
  title: "lander-designer",
  type: Phaser.AUTO,
  width: width,
  height: height,
  parent: 'phaser-app',
  scene: [MountainDesignerScene, GameSceneGrid],
  scale: {
    parent: 'phaser-app',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: width,
    height: height,
  },
  backgroundColor: "#000000",
  render: { pixelArt: false, antialias: true },
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      debugShowInternalEdges: true,
      debugShowConvexHulls: true
    }
  },
};

let game = new Phaser.Game(config);
