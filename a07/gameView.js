// This class will act as the View class for MVC

export default class gameView{
    constructor(model) {
        this.model = model;
        this.div = document.createElement('div');

        
        this.updateBoard(this.model);
        this.updateScore(this.model);
        this.createReset();

        let instructions = document.createElement('p');
        instructions.setAttribute('id','instruct');
        instructions.textContent = 'HOW TO PLAY: Use your arrow keys to move the tiles. Tiles with the same number merge into one when they touch. Add them up to reach 2048!';
        
        this.div.append(instructions);
    }

    updateBoard(newModel, isOver){
        let findCell = newModel.divideBoard(newModel.getBoard(),'right');
        let gameTable = document.createElement('table');
        gameTable.setAttribute('id','gameTable');
        for (let r = 0; r < newModel.getSize(); r++){
            let trow = document.createElement('tr');
            for (let c=0; c < newModel.getSize(); c++){
                let tcell = document.createElement('td');
                tcell.append(findCell[r][c]);
                tcell.setAttribute('id',"tile-" + findCell[r][c]);
                trow.append(tcell);
            }
            gameTable.append(trow);
        }

        if (isOver){
           this.div.querySelector('#over-display').replaceWith(gameTable);
        }
        else{
            if(this.div.querySelector('#gameTable') !== null){
                this.div.querySelector('#gameTable').replaceWith(gameTable);
            }
            else{
                this.div.append(gameTable);
            }
        }
    }

    winResetBoard(newModel,resetWin){
        let findCell = newModel.divideBoard(newModel.getBoard(),'right');
        let gameTable = document.createElement('table');
        gameTable.setAttribute('id','gameTable');
        for (let r = 0; r < newModel.getSize(); r++){
            let trow = document.createElement('tr');
            for (let c=0; c < newModel.getSize(); c++){
                let tcell = document.createElement('td');
                tcell.append(findCell[r][c]);
                tcell.setAttribute('id',"tile-" + findCell[r][c]);
                trow.append(tcell);
            }
            gameTable.append(trow);
        }

        if (resetWin){
            document.querySelector('#win-display').replaceWith(gameTable);
        }
        else{
        document.querySelector('#gameTable').replaceWith(gameTable);
        }
    }

    updateScore(newModel){
        let scoreDisplay = document.createElement('div');
        scoreDisplay.setAttribute('id','score');
        scoreDisplay.textContent = "Score: " + newModel.getScore();

        if(document.querySelector("#score") !== null){
            document.querySelector("#score").replaceWith(scoreDisplay);
        }
        else{
            document.querySelector('#top-game').append(scoreDisplay);
        }
    }
    
    createReset(){
        let resetButton = document.createElement('button');
        resetButton.setAttribute('id','reset-game');
        resetButton.textContent = 'Reset';
        document.querySelector('#top-game').append(resetButton);
    }

    winScreen(){
        let winDisplay = document.createElement('div');
        winDisplay.setAttribute('id','win-display');
        winDisplay.textContent = 'You win!';

        let subtext = document.createElement('p');
        subtext.setAttribute('id','win-text');
        subtext.textContent = 'Press the spacebar to continue or press the \"Reset\" button to try again.'
        winDisplay.append(subtext);

        document.querySelector('#gameTable').replaceWith(winDisplay);
    }

    overScreen(){
        let overDisplay = document.createElement('div');
        overDisplay.setAttribute('id','over-display');
        overDisplay.textContent = 'You lost!';

        let subtext = document.createElement('p');
        subtext.setAttribute('id','over-text');
        subtext.textContent = 'Press the \"Reset\" button to try again.'
        overDisplay.append(subtext);

        if (document.querySelector('#gameTable') !== null){
            document.querySelector('#gameTable').replaceWith(overDisplay);
        }
        else{ }
    }

    winBoard(currentModel, hasWon){
        let findCell = currentModel.divideBoard(currentModel.getBoard(),'right');
        let gameTable = document.createElement('table');
        gameTable.setAttribute('id','gameTable');
        for (let r = 0; r < currentModel.getSize(); r++){
            let trow = document.createElement('tr');
            for (let c=0; c < currentModel.getSize(); c++){
                let tcell = document.createElement('td');
                tcell.append(findCell[r][c]);
                tcell.setAttribute('id',"tile-" + findCell[r][c]);
                trow.append(tcell);
            }
            gameTable.append(trow);
        }
        if (hasWon){
            if (this.div.querySelector('#win-display') !== null){
                this.div.querySelector('#win-display').replaceWith(gameTable);;
            }
            else{

            }
        }
        else{}
    }
}
