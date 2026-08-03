import "phaser";

import { BootScene } from "../games/lander/scenes/bootScene";
import { GameSceneInstrumented } from "../games/lander/scenes/gameSceneInstrumented";
import { GameSceneOverlay } from "../games/lander/scenes/gameSceneOverlay";
import { ControllerScene } from "../games/lander/scenes/controllerScene";
import { Logger } from "../common/classes/logger";
import { g_version } from "../version";

Logger.log("top of lander subapp/0.ts");

var width: number = 1440;
var height: number = 720;

const config = {
  title: "lander-staging",
  url: "https://nschul4.github.io/www/phaser/lander/",
  version: `${g_version}-staging`,

  type: Phaser.AUTO,
  width: width,
  height: height,
  parent: 'phaser-app',
  scene: [BootScene, ControllerScene, GameSceneOverlay, GameSceneInstrumented],
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
      autoUpdate: true,
      fixedStep: true,
      debugShowInternalEdges: true,
      debugShowConvexHulls: true
    }
  },
};

let game = new Phaser.Game(config);