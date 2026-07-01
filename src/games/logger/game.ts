import "phaser";

import { show_all as scale_mode } from '../../common/js/game_scales'

import { BootScene } from "./scenes/bootScene";
import { GameScene } from "./scenes/gameScene";

import { ControllerScene } from "./scenes/controllerScene";
import { Logger } from "../../common/classes/logger";

Logger.log("top of logger game.ts");

const config = {

  title: "logger",
  url: "https://nschul4.github.io/www/phaser/logger",
  version: "1.0",

  type: Phaser.AUTO,
  width: 1440,
  height: 720,
  parent: 'phaser-app',
  scene: [BootScene, ControllerScene, GameScene],
  backgroundColor: "#222222",
  render: { pixelArt: false, antialias: true },
  scale: {
    parent: 'phaser-app',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1440,
    height: 720
  },
};

let game = new Phaser.Game(config);
