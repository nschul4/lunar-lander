import "phaser";

import { BootScene } from "../scenes/bootScene";
import { GameScene } from "../scenes/gameScene";
import { GameSceneOverlay } from "../scenes/gameSceneOverlay";
import { ControllerScene } from "../scenes/controllerScene";
import { g_version } from "../version";

const width: number = 1440;
const height: number = 720;

const config = {
  title: "lander",
  url: "https://nschul4.github.io/www/phaser/lander/",
  version: g_version,

  type: Phaser.AUTO,
  width: width,
  height: height,
  parent: 'phaser-app',
  scene: [BootScene, ControllerScene, GameSceneOverlay, GameScene],
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
      debug: false,
      autoUpdate: true,
      fixedStep: true
    }
  },
};

new Phaser.Game(config);