class Player {
    constructor(symbol) {
        this.symbol = symbol;
    }

    makeMove(board, position) {
        if (board[position] === '') {
            board[position] = this.symbol;
            return true;
        }
        return false;
    }
}

export default Player;