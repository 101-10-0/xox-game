export class Game {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'O';  // Start with O (human player)
        this.isAITurn = false;     // Add flag to track AI's turn
    }

    makeMove(index) {
        if (this.board[index] === null && !this.isAITurn) {
            // Human move (O)
            this.board[index] = 'O';
            
            if (this.checkWin()) {
                return 'win';
            }
            if (this.checkDraw()) {
                return 'draw';
            }
            
            this.isAITurn = true;
            this.currentPlayer = 'X';
            return true;
        } else if (this.board[index] === null && this.isAITurn) {
            // AI move (X)
            this.board[index] = 'X';
            
            if (this.checkWin()) {
                return 'win';
            }
            if (this.checkDraw()) {
                return 'draw';
            }
            
            this.isAITurn = false;
            this.currentPlayer = 'O';
            return true;
        }
        return false;
    }

    checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
    }

    checkDraw() {
        return !this.board.includes(null);
    }

    reset() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'O';  // Reset to O (human player)
        this.isAITurn = false;     // Reset AI turn flag
    }
}