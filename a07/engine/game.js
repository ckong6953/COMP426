/*
Add your code for Game here
 */

// This will act as the Model in MVC 
export default class Game {
    constructor(size) {
        const dimensions = size * size;

        this.gameState = {
            board: new Array(dimensions),
            score: 0,
            won: false,
            over: false,
        }

        this.gameState.board.fill(0);
        this.gameState.board[this.createPosition(this.gameState.board)] = this.createTile();
        this.gameState.board[this.createPosition(this.gameState.board)] = this.createTile();
        
        this.moveObservers = [];
        this.winObservers = [];
        this.loseObservers = [];
    }

      // **REQUIRED FUNCTION**
    // Resets the game back to a random starting position.
    setupNewGame() {
        this.gameState.board.fill(0);
        this.gameState.board[this.createPosition(this.gameState.board)] = this.createTile();
        this.gameState.board[this.createPosition(this.gameState.board)] = this.createTile();
        this.gameState.score = 0;
        this.gameState.won = false;
        this.gameState.over = false;
    }

    // **REQUIRED FUNCTION**
    // Given a gameState object, it loads that board, score, etc...
    loadGame(newGameState) {
        this.gameState = newGameState;
    }

    //**REQUIRD FUNCTION**
    // Given "up", "down", "left", or "right" as string input, 
    // it makes the appropriate shifts and adds a random tile.
    move(direction) {
        let parseArray = this.divideBoard(this.gameState.board, direction);

        let compareBoard = [];

        switch (direction) {
            case 'left':
                parseArray.forEach(row =>
                    compareBoard = compareBoard.concat(this.mergeLeft(row))
                );
                break;
            case 'right':
                parseArray.forEach(row =>
                    compareBoard = compareBoard.concat(this.mergeRight(row))
                );
                break;
            case 'up':
                parseArray.forEach(col =>
                    compareBoard = compareBoard.concat(this.mergeUp(col)),
                );
                compareBoard = this.convertCol(compareBoard);
                break;
            case 'down':
                parseArray.forEach(col =>
                    compareBoard = compareBoard.concat(this.mergeDown(col))
                );
                compareBoard = this.convertCol(compareBoard);
                break;
        }   

        if(this.checkMove(this.gameState.board,compareBoard)){
            compareBoard[this.createPosition(compareBoard)] = this.createTile();
            this.gameState.board = compareBoard;
        }

        this.moveObservers.forEach(l => l(this.getGameState()));

        if (this.checkWin(this.gameState.board)){
            this.gameState.won = true;
            this.winObservers.forEach(l => l(this.getGameState()));
        }

        if (this.checkLoss(this.gameState.board)){
            this.gameState.over = true;
            this.loseObservers.forEach(l => l(this.getGameState()));
        }

    }

    //**REQUIRED FUNCTION**
    // Returns a string representation of the game as text/ascii.
    // Not graded.
    toString() {
        let boardString = '';
        for (let i = 0; i < this.gameState.board.length; i++) {
            if (i % Math.sqrt(this.gameState.board.length) == Math.sqrt(this.gameState.board.length) - 1) {
                boardString += '[' + this.gameState.board[i] + '] \n';
            }
            else {
                boardString += '[' + this.gameState.board[i] + '] ';
            }
        }
        return boardString;
    }

    //**REQUIRED FUNCTION**
    // Takes a callback function as input and registers that function as a listener to the move event. 
    // Every time a move is made, the game should call all previously registered move callbacks, 
    // passing in the game's current gameState as an argument to the function.
    
    onMove(callback) {
        this.moveObservers.push(callback);
    }

    //**REQUIRED FUNCTION**
    // Takes a callback function as input and registers that function as a listener to the win event. 
    // When the player wins the game (by making a 2048 tile), the game should call all previously registered win callbacks, 
    // passing in the game's current gameState as an argument to the function.
    onWin(callback){
        this.winObservers.push(callback);
    }

    //**REQUIRED FUNCTION**
    // Takes a callback function as input and registers that function as a listener to the move event. 
    // When the game transitions into a state where no more valid moves can be made, the game should call all 
    // previously registered lose callbacks, passing in the game's current gameState as an argument to the function.
    onLose(callback) {
        this.loseObservers.push(callback);
    }

    //**REQUIRED FUNCTION**
    // Returns a accurate gameState object representing the current game state.
    getGameState() {
        return this.gameState;
    }

    // creates the tile that will be added to the board every move.
    createTile() {
        return (Math.floor(Math.random() * 10) < 9 ? 2 : 4);
    }

    // Finds and returns an open tile position on the current board.
    createPosition(nums) {
        let newPos = Math.floor(Math.random() * nums.length);
        while (nums[newPos] != 0) {
            newPos = Math.floor(Math.random() * nums.length);
        }
        return newPos;
    }

    // This is a pure function that returns the row array when 
    // the user pushes the tiles to the left.
    mergeLeft(nums) {
        let leftMergeNums = nums;
        let rowPos = leftMergeNums.length - 1;
        // let hasMerged = false;
        while (rowPos >= 0) {
            if (leftMergeNums[rowPos] == 0) {
                leftMergeNums.splice(rowPos, 1);
                leftMergeNums.push(0);
            }
            rowPos--;
        }

        rowPos = 0;
        while (rowPos < leftMergeNums.length) {
            if (leftMergeNums[rowPos] == leftMergeNums[rowPos + 1]) {
                leftMergeNums[rowPos] = leftMergeNums[rowPos] + leftMergeNums[rowPos];
                this.setScore(leftMergeNums[rowPos]);
                leftMergeNums.splice(rowPos + 1, 1);
                leftMergeNums.push(0);
                // hasMerged = true;
            }
            rowPos++;
        }
        return leftMergeNums;
    }


    // This is a pure function that returns the row array when
    // the user pushes the tiles to the right.
    mergeRight(nums) {
        let rightMergeNums = nums;
        let rowPos = 0;
        // let hasMerged = false;

        while (rowPos < rightMergeNums.length) {
            if (rightMergeNums[rowPos] == 0) {
                rightMergeNums.splice(rowPos, 1);
                rightMergeNums.splice(0, 0, 0);
            }
            rowPos++;
        }

        rowPos = rightMergeNums.length - 1;
        while (rowPos > 0) {
            if (rightMergeNums[rowPos] == rightMergeNums[rowPos - 1]) {
                rightMergeNums[rowPos] = rightMergeNums[rowPos] + rightMergeNums[rowPos];
                this.setScore(rightMergeNums[rowPos]);
                rightMergeNums.splice(rowPos - 1, 1);
                rightMergeNums.splice(0, 0, 0);
                // hasMerged = true;
            }
            rowPos--;
        }

        return rightMergeNums;
    }

    // This is a pure function that returns the column array when
    // the user pushes the tiles in the up direction. 
    // This assumes that nums is a column.
    mergeUp(nums) {
        let upMergeNums = nums;
        let colPos = upMergeNums.length - 1;
        // let hasMerged = false;

        while (colPos >= 0) {
            if (upMergeNums[colPos] == 0) {
                upMergeNums.splice(colPos, 1);
                upMergeNums.push(0);
            }
            colPos--;
        }

        colPos = 0;

        while (colPos < upMergeNums.length - 1) {
            if (upMergeNums[colPos] == upMergeNums[colPos + 1]) {
                upMergeNums[colPos] = upMergeNums[colPos] + upMergeNums[colPos];
                this.setScore(upMergeNums[colPos]);
                upMergeNums.splice(colPos + 1, 1);
                upMergeNums.push(0);
                // hasMerged = true;
            }
            colPos++;
        }

        return upMergeNums;
    }

    // This is a pure fucniton that returns the column array when 
    // the user pushes the tiles in the downward direction.
    // This assumes that nums is a column.
    mergeDown(nums) {
        let downMergeNums = nums;
        let colPos = 0;
        // let hasMerged = false;

        while (colPos < downMergeNums.length) {
            if (downMergeNums[colPos] == 0) {
                downMergeNums.splice(colPos, 1);
                downMergeNums.splice(0, 0, 0);
            }
            colPos++;
        }

        colPos = downMergeNums.length - 1;
        while (colPos > 0) {
            if (downMergeNums[colPos] == downMergeNums[colPos - 1]) {
                downMergeNums[colPos] = downMergeNums[colPos] + downMergeNums[colPos];
                this.setScore(downMergeNums[colPos]);
                downMergeNums.splice(colPos - 1, 1);
                downMergeNums.splice(0, 0, 0);
                // hasMerged = true;
            }
            colPos--;
        }
        return downMergeNums;
    }

    // This function is to help create rows or columns that will 
    // allow the Game class to subdivide the given gameState board
    // to try different moves.
    divideBoard(nums, direction) {
        const size = Math.sqrt(nums.length);
        let containAll = new Array(size);

        if (direction == 'left' || direction == 'right') {
            for (let i = 0; i < containAll.length; i++) {
                containAll[i] = nums.slice(i * size, (size + i * size));
            }
        }
        else if (direction == 'up' || direction == 'down') {
            for (let i = 0; i < size; i++) {
                let addCol = [];
                for (let j = i; j < nums.length; j += size) {
                    addCol.push(nums[j]);
                }
                containAll[i] = addCol;
            }
        }

        return containAll;
    }

    // Given how the mergeUp and mergeDown functions return
    // a column instead of a row, this will take the concatenated
    // array of columns and convert them to row format. 
    convertCol(nums){
        const size = Math.sqrt(nums.length);
        let toRow = [];
        for (let i = 0; i < size; i++){
            let addCol = [];
            for (let j = i; j < nums.length; j+= size){
                addCol.push(nums[j]);
            }
            toRow = toRow.concat(addCol);
        }
        return toRow;
    }

    // This is not a pure function as it modifies the gameState score.
    setScore (points){
        this.gameState.score += points;    
    }

    // This checks if the move was a valid move. 
    checkMove(oldState, newState){
        for (let i = 0; i < oldState.length; i++){
            if (oldState[i] != newState[i]){
                return true;
            }
        }
        return false;
    }

    // Check if a 2048 tile has been made
    checkWin(nums){
        if (nums.includes(2048)){
            return true;
        }
        return false;
    }

    // Check if the board is full and no more moves available.
    // FIX this function
    checkLoss(nums){
        if (nums.includes(0)){
            return false;    
        }

        let rowCheck = this.divideBoard(nums,'right');
        let colCheck = this.divideBoard(nums,'up');

        let foundMove = false;

        rowCheck.forEach(row => {
            for (let i = 0; i < row.length -1; i++){
                if (row[i] == row[i+1]){
                    foundMove = true;
                }
            }
            for (let i = row.length; i > 0; i--){
                if (row[i] == row[i-1]){
                    foundMove = true;
                }
            }
        });

        colCheck.forEach(col => {
            for(let i = 0; i < col.length -1; i++){
                if (col[i] == col[i+1]){
                    foundMove = true;
                }
            }
            for (let i = col.length; i > 0; i--){
                if (col[i] == col[i-1]){
                    foundMove = true;
                }
            }
        });

        if (foundMove){
            return false;
        }
        return true;
    }

    // Getters

    // Returns the current state of the 2048 board.
    getBoard(){
        return this.gameState.board;
    }

    // returns the dimensions of the board.
    getSize(){
        return Math.sqrt(this.gameState.board.length);
    }

    // Returns the score.
    getScore(){
        return this.gameState.score;
    } 

    // Returns if the game has been won or not.
    getStatus(){
        return this.gameState.won;
    }

    // Returns if the game is over.
    getOver(){
        return this.gameState.over;
    }
}

