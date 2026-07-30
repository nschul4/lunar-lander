import "phaser";

import { GameSceneBoot } from "../scenes/gameSceneBoot";
import { GameSceneControls } from "../scenes/gameSceneControls";
import { GameScene } from "../scenes/gameScene";
import { GameSceneOverlay } from "../scenes/gameSceneOverlay";
import { GameSceneController } from "../scenes/gameSceneController";
import { Logger } from "../logger";
import { g_version } from "../version";

Logger.log("top of lander subapp/mainGame.ts");



const width: number = 1440;
const height: number = 720;

const bootScene = new GameSceneBoot({ nextScene: "ControlsScene" });

const config = {
  title: "lander",
  url: "https://nschul4.github.io/www/phaser/lander/",
  version: g_version,
  type: Phaser.AUTO,
  width: width,
  height: height,
  parent: 'phaser-app',
  scene: [bootScene, GameSceneControls, GameSceneController, GameSceneOverlay, GameScene],
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

let game = new Phaser.Game(config);