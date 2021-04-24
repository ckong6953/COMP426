
export default class gameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        let mustReset = false;
        let hasWon = false;
        let canMove = true;
        let postWinReset = false;
        // This code was taken from 2048.js (just as a note in case things need to be moved around again)
        let body = document.querySelector('body');
        body.append(this.view.div);

        // ResetButton:
        let resetButton = document.getElementById('reset-game');
        resetButton.addEventListener('click', () => {
            if (postWinReset) {
                this.model.setupNewGame();
                this.view.updateScore(this.model);
                this.view.winResetBoard(this.model,postWinReset);
                postWinReset = false;
            }
            else {
                this.model.setupNewGame();
                this.view.updateScore(this.model);
                this.view.updateBoard(this.model, mustReset);
            }
            mustReset = false;
            canMove = true;
        });

        document.addEventListener('keydown', (e) => {
            e = e || window.event;
            if (!this.model.getOver() && canMove) {
                if (e.keyCode == '38') {
                    this.model.move('up');
                    this.view.updateBoard(this.model);
                    this.view.updateScore(this.model);
                }
                else if (e.keyCode == '40') {
                    this.model.move('down');
                    this.view.updateBoard(this.model);
                    this.view.updateScore(this.model);
                }
                else if (e.keyCode == '37') {
                    this.model.move('left');
                    this.view.updateBoard(this.model);
                    this.view.updateScore(this.model);
                }
                else if (e.keyCode == '39') {
                    this.model.move('right');
                    this.view.updateBoard(this.model);
                    this.view.updateScore(this.model);
                }
            }

            if (this.model.getStatus() && !hasWon) {
                this.view.winScreen();
                hasWon = true;
                canMove = false;
                postWinReset = true;
            }

            if (this.model.getOver()) {
                this.view.overScreen(this.model.getOver());
                canMove = false;
                mustReset = true;
            }
        });

        document.addEventListener('keydown', (event) => {
            event = event || window.event;
            if (hasWon && postWinReset) {
                if (event.keyCode == '32') {
                    this.view.winBoard(this.model, this.model.getStatus());
                    this.view.updateScore(this.model);
                    canMove = true;
                    postWinReset = false;
                }
            }
        });
    }
}