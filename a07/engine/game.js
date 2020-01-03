/*
Add your code for Game here
 */
export default class Game {
    constructor(size) {
        let twod = new Array(size);
        for (let i = 0; i < twod.length; i++) {
            twod[i] = new Array(size);
        }
        this.board2d = twod;
        this.gameState = {
            board: new Array(size * size), 
            score: 0,
            won: false,
            over: false,
        }
        //initialize 1d array
        for (let i = 0; i < this.gameState.board.length; i++) {
            this.gameState.board[i] = 0;
        }
        this.addNewTile();
        this.addNewTile();
        
        //update 2d array
        let k = 0;
        for (let i = 0; i < this.board2d.length; i++) {
            for (let j = 0; j < this.board2d[i].length; j++) {
                this.board2d[i][j] = this.gameState.board[k];
                k++;
            }
        }

        //create onMove array
        this.onMoveArr = [];
        this.onLoseArr = [];
        this.onWinArr = [];
    }

    setupNewGame() {
        let size = Math.sqrt(this.gameState.board.length);
        let newGame = new Game(size);
        this.gameState = newGame.gameState;
        this.board2d = newGame.board2d;
    }

    loadGame(gameState) {
        this.gameState = gameState;
        let size = Math.sqrt(gameState.board.length);
        this.board2d = new Array(size);
        for (let i = 0; i < this.board2d.length; i++) {
            this.board2d[i] = new Array(size);
        }
        let k = 0;
        for (let i = 0; i < this.board2d.length; i++) {
            for (let j = 0; j < this.board2d[i].length; j++) {
                this.board2d[i][j] = this.gameState.board[k];
                k++;
            }
        }

    }

    move(direction) {
        let changed = false;
        if (direction === "right") {
            for (let i = 0; i < this.board2d.length; i++) {
                this.board2d[i] = this.moveRight(this.board2d[i]);
            }
        } else if (direction === "left") {
            for (let i = 0; i < this.board2d.length; i++) {
                this.board2d[i] = this.moveLeft(this.board2d[i]);
            }
        } else if (direction === "up") {
            for (let j = 0; j < this.board2d.length; j++) {
                let col = new Array(this.board2d[0].length);
                for (let i = 0; i < this.board2d.length; i++) {
                    col[i] = this.board2d[i][j];
                }
                col = this.moveUp(col);
                for (let i = 0; i < this.board2d.length; i++) {
                    this.board2d[i][j] = col[i];
                }
            }
        } else if (direction === "down") {
            for (let j = 0; j < this.board2d.length; j++) {
                let col = new Array(this.board2d[0].length);
                for (let i = 0; i < this.board2d.length; i++) {
                    col[i] = this.board2d[i][j];
                }
                col = this.moveDown(col);
                for (let i = 0; i < this.board2d.length; i++) {
                    this.board2d[i][j] = col[i];
                }
            }
        }

        if (this.compareArrays()) {
            changed = true;
        }

        //update 1d array
        let k = 0;
        for (let i = 0; i < this.board2d.length; i++) {
            for (let j = 0; j < this.board2d[i].length; j++) {
                this.gameState.board[k] = this.board2d[i][j];
                k++;
            }
        }
        if (changed) {
            this.addNewTile();
            for (let i = 0; i < this.onMoveArr.length; i++) {
                this.onMoveArr[i](this.gameState);
            }
            this.gameState.won = this.checkIfWon();
            if (this.gameState.won) {
                for (let i = 0; i < this.onWinArr.length; i++) {
                    this.onWinArr[i](this.gameState);
                }
            }
            this.gameState.over = this.checkIfOver();
            if (this.gameState.over) {
                for (let i = 0; i < this.onLoseArr.length; i++) {
                    this.onLoseArr[i](this.gameState);
                }
            }
        }
       
    }

    moveRight(row) {
        row = this.mergeRight(row);
        row = this.shiftRight(row);
        return row;
    }

    moveLeft(row) {
        row = this.mergeLeft(row);
        row = this.shiftLeft(row);
        return row;
    }

    moveUp(col) {
        col = this.mergeLeft(col);
        col = this.shiftLeft(col);
        return col;
    }

    moveDown(col) {
        col = this.mergeRight(col);
        col = this.shiftRight(col);
        return col;
    }

    mergeRight(row) {
        for (let i = row.length - 1; i > 0; i--) {
            for (let j = i - 1; j >= 0; j--) {
                if (row[j] == 0) {
                    continue;
                } else if (row[j] != row[i]) {
                    break;
                } else {
                    row[i] += row[j];
                    this.gameState.score += row[i];
                    row[j] = 0;
                    break;
                }
            }
        }
        return row;
    }

    mergeLeft(row) {
        for (let i = 0; i < row.length - 1; i++) {
            for (let j = i + 1; j < row.length; j++) {
                if (row[j] == 0) {
                    continue;
                } else if (row[j] != row[i]) {
                    break;
                } else {
                    row[i] += row[j];
                    this.gameState.score += row[i];
                    row[j] = 0;
                    break;
                }
            }
        }
        return row;
    }

    shiftRight(row) {
        for (let i = row.length - 1; i >= 0; i--) {
            if (row[i] == 0) {
                for (let j = i - 1; j >= 0; j--) {
                    if (row[j] > 0) {
                        row[i] = row[j];
                        row[j] = 0;
                        break;
                    }
                }
            }
        }
        return row;
    }

    shiftLeft(row) {
        for (let i = 0; i < row.length; i++) {
            if (row[i] == 0) {
                for (let j = i + 1; j < row.length; j++) {
                    if (row[j] > 0) {
                        row[i] = row[j];
                        row[j] = 0;
                        break;
                    }
                }
            }
        }
        return row;
    }

    toString() {
        let r = "";
        //adds board state
        for (let i = 0; i < this.board2d.length; i++) {
            for (let j = 0; j < this.board2d[i].length; j++) {
                if (this.board2d[i][j] == 0) {
                    r = r.concat("[ ] ");
                } else {
                    r = r.concat("["+this.board2d[i][j]+"] ");
                }
            }
            r = r.concat("\n");
        }
        //adds score + won + over
        r = r.concat("score: "+this.gameState.score+"\n");
        r = r.concat("won: "+this.gameState.won+"\n");
        r = r.concat("over: "+this.gameState.over);
        return r;
    }

    onMove(callback) {
        this.onMoveArr[this.onMoveArr.length] = callback;
    }

    onWin(callback) {
        this.onWinArr[this.onWinArr.length] = callback;
    }

    onLose(callback) {
        this.onLoseArr[this.onLoseArr.length] = callback;
    }

    getGameState() {
        return this.gameState;
    }

    checkIfOver() {
        for (let i = 0; i < this.board2d.length; i++) {
            for (let j = 0; j < this.board2d.length; j++) {
                //check above
                if (i - 1 >= 0) {
                    if (this.board2d[i-1][j] == 0) {
                        return false;
                    } else if (this.board2d[i-1][j] == this.board2d[i][j]) {
                        return false;
                    }
                }
                //check below
                if (i + 1 < this.board2d.length) {
                    if (this.board2d[i+1][j] == 0) {
                        return false;
                    } else if (this.board2d[i+1][j] == this.board2d[i][j]) {
                        return false
                    }
                }
                //check left
                if (j - 1 >= 0) {
                    if (this.board2d[i][j-1] == 0) {
                        return false;
                    } else if (this.board2d[i][j-1 == this.board2d[i][j]]) {
                        return false;
                    }
                }
                //check right
                if (j + 1 < this.board2d.length) {
                    if (this.board2d[i][j+1] == 0) {
                        return false;
                    } else if (this.board2d[i][j+1] == this.board2d[i][j]) {
                        return false;
                    }
                }
            } 
        }
        return true;
    }

    checkIfWon() {
        for (let i = 0; i < this.gameState.board.length; i++) {
            if (this.gameState.board[i] >= 2048) {
                return true;
            } 
        }
        return false;
    }

    addNewTile() {
        //check for empty spots
        let empty = [];
        for (let i = 0; i < this.gameState.board.length; i++) {
            if (this.gameState.board[i] == 0) {
                empty[empty.length] = i;
            }
        }
        //do nothing if no empty spots
        if (empty.length == 0) {
            return;
        }
        //add 2 with p = 0.9 or 4 with p = 0.1
        let max = empty.length;
        let index = Math.floor(Math.random() * max);
        if (Math.random() < 0.9) {
            this.gameState.board[empty[index]] = 2;
        } else {
            this.gameState.board[empty[index]] = 4;
        }
        // add to 2d array
        let k = 0;
        for (let i = 0; i < this.board2d.length; i++) {
            for (let j = 0; j < this.board2d[i].length; j++) {
                this.board2d[i][j] = this.gameState.board[k];
                k++;
            }
        }
    }

    compareArrays() {
        let k = 0;
        for (let i = 0; i < this.board2d.length; i++) {
            for (let j = 0; j < this.board2d[i].length; j++) {
                if (this.board2d[i][j] != this.gameState.board[k]) {
                    return true;
                }
                k++;
            }
        }
        return false;
    }
}