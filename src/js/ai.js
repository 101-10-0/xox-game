export class AI {
    constructor(game) {
        this.game = game;
    }

    makeMove() {
        const availableMoves = this.game.board
            .map((cell, index) => cell === '' ? index : null)
            .filter(cell => cell !== null);

        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
    }

    static getBestMove(board) {
        // First, check if AI can win in the next move
        const winningMove = this.findWinningMove(board, 'X');
        if (winningMove !== null) {
            return winningMove;
        }

        // Second, block player's winning move
        const blockingMove = this.findWinningMove(board, 'O');
        if (blockingMove !== null) {
            return blockingMove;
        }

        // Third, try to create a fork (two winning paths)
        const forkMove = this.findForkMove(board);
        if (forkMove !== null) {
            return forkMove;
        }

        // Fourth, take center if available
        if (board[4] === null) {
            return 4;
        }

        // Fifth, take corners
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(i => board[i] === null);
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }

        // Finally, take any available side
        const sides = [1, 3, 5, 7];
        const availableSides = sides.filter(i => board[i] === null);
        if (availableSides.length > 0) {
            return availableSides[Math.floor(Math.random() * availableSides.length)];
        }

        return null;
    }

    static findWinningMove(board, player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] === player && board[b] === player && board[c] === null) return c;
            if (board[a] === player && board[c] === player && board[b] === null) return b;
            if (board[b] === player && board[c] === player && board[a] === null) return a;
        }
        return null;
    }

    static findForkMove(board) {
        // Check for potential fork opportunities
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                // Simulate placing X in this position
                board[i] = 'X';
                let winningPaths = 0;
                
                // Count potential winning paths
                const patterns = [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8],
                    [0, 3, 6], [1, 4, 7], [2, 5, 8],
                    [0, 4, 8], [2, 4, 6]
                ];

                for (let pattern of patterns) {
                    const [a, b, c] = pattern;
                    const line = [board[a], board[b], board[c]];
                    if (line.filter(cell => cell === 'X').length === 2 &&
                        line.filter(cell => cell === null).length === 1) {
                        winningPaths++;
                    }
                }

                // Reset the board
                board[i] = null;

                if (winningPaths >= 2) {
                    return i;
                }
            }
        }
        return null;
    }

    static minimax(board, depth, isMaximizing) {
        const winner = this.checkWinner(board);
        if (winner === 'O') return 10 - depth;
        if (winner === 'X') return depth - 10;
        if (this.isBoardFull(board)) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'O';
                    bestScore = Math.max(bestScore, this.minimax(board, depth + 1, false));
                    board[i] = null;
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'X';
                    bestScore = Math.min(bestScore, this.minimax(board, depth + 1, true));
                    board[i] = null;
                }
            }
            return bestScore;
        }
    }

    static checkWinner(board) {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        for (const [a, b, c] of lines) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    static isBoardFull(board) {
        return !board.includes(null);
    }
}