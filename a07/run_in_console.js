import keypress from 'keypress';
import Game from "./engine/game.js";

keypress(process.stdin);


/**
 * The code in this file is used to run your game in the console. Use it
 * to help develop your game engine.
 *
 */

let game = new Game(4);
console.log(game.toString());
game.loadGame({
    board: [2,4,8,4,4,8,4,8,0,2,16,2,2,8,32,4],
    score: 0,
    won: false,
    over: false
})

console.log(game.toString());

game.onMove(gameState => {
    console.log(game.toString());
    console.log(game.gameState);
});

game.onWin(gameState => {
    console.log('You won with a gameState of...', gameState)
});

game.onLose(gameState => {
    console.log('You lost! :(', gameState)
    console.log(`Your score was ${gameState.score}`);
    console.log(game.toString());
});

process.stdin.on('keypress', function (ch, key) {
    switch (key.name) {
        case 'right':
            game.move('right');
            break;
        case 'left':
            game.move('left');
            break;
        case 'down':
            game.move('down');

            break;
        case 'up':
            game.move('up');
            break;
    }
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
});


process.stdin.setRawMode(true);
process.stdin.resume();

