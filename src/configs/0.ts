import "../style.css";
import "phaser";

import { GameSceneBoot } from "../scenes/gameSceneBoot";
import { GameSceneInstrumented } from "../scenes/gameSceneInstrumented";
import { GameSceneOverlay } from "../scenes/gameSceneOverlay";
import { GameSceneController } from "../scenes/gameSceneController";
import { Logger } from "../logger";
import { g_version } from "../version";

Logger.log("top of lander subapp/0.ts");

const width: number = 1440;
const height: number = 720;

// GameSceneInstrumented registers as "GameScene", so Boot needs to launch "GameScene"
const bootScene = new GameSceneBoot({ nextScene: "GameScene" });

const config = {
  title: "lander-staging",
  url: "https://github.com/nschul4/lunar-lander",
  version: g_version,
  type: Phaser.AUTO,
  width: width,
  height: height,
  parent: 'phaser-app',
  scene: [bootScene, GameSceneController, GameSceneOverlay, GameSceneInstrumented],
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