import "phaser";

import { GameSceneBoot } from "../scenes/gameSceneBoot";
import { GameSceneOverview as GameSceneLevelOverview } from "../scenes/gameSceneLevelOverview";
import { GameSceneOverlay } from "../scenes/gameSceneOverlay";
import { GameSceneController } from "../scenes/gameSceneController";
import { Logger } from "../logger";
import { g_version } from "../version";

Logger.log("top of lander subapp/1.ts");

const width: number = 1440;
const height: number = 720;

const bootScene = new GameSceneBoot({ nextScene: "GameScene" });

const config = {
  title: "lander-test",
  url: "https://github.com/nschul4/lunar-lander",
  version: g_version,
  type: Phaser.AUTO,
  width: width,
  height: height,
  parent: 'phaser-app',
  scene: [bootScene, GameSceneController, GameSceneOverlay, GameSceneLevelOverview],
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