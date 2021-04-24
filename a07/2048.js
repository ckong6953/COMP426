import Game from "./engine/game.js";
import gameView from"./gameView.js";
import gameController from "./gameController.js";

window.addEventListener('load', () => {
    let model = new Game(4);
    let view = new gameView(model);
    let controller = new gameController(model,view);    
});