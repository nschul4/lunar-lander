import { Logger } from "../objects/logger";

export function show_all(game) {
    Logger.log("show_all");
    var canvas = document.getElementsByTagName('canvas')[0];
    var window_width = window.innerWidth
    var window_height = window.innerHeight
    var window_ratio = window_width / window_height
    var game_ratio = game.config.width / game.config.height
    if (window_ratio < game_ratio) {
        Logger.log("show_all: case1");
        canvas.style.width = window_width + 'px'
        canvas.style.height = Math.floor(window_width / game_ratio) + 'px'
    } else {
        Logger.log("show_all: case2");
        canvas.style.width = Math.floor(window_height * game_ratio) + 'px'
        canvas.style.height = window_height + 'px'
    }
    Logger.log("show_all: canvas.style.width: " + canvas.style.width);
    Logger.log("show_all: canvas.style.height: " + canvas.style.height);
}

export function resize(game) {
    game.resize(window.innerWidth, window.innerHeight)
}
