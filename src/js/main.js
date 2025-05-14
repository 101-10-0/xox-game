import { Game } from './game.js';
import { Scoreboard } from './scoreboard.js';
import { AI } from './ai.js';

const modal = document.getElementById('gameModal');
const modalMessage = modal.querySelector('.modal-message');
const modalClose = modal.querySelector('.modal-close');

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    const scoreboard = new Scoreboard();
    const cells = document.querySelectorAll('.cell');
    const startGameBtn = document.getElementById('startGame');

    function showModal(message, winner) {
        const modalImage = document.getElementById('modalImage');
        if (winner === 'draw') {
            modalImage.src = 'assets/images/background.jpg';
            modalMessage.textContent = "Totoro and Cat bus have reached a peaceful tie! 🌿";
        } else {
            modalImage.src = winner === 'O' ? 'assets/images/catbus.jpg' : 'assets/images/totoro.jpg';
            modalMessage.textContent = message;
        }
        modal.style.display = 'block';
    }

    function handleCellClick(event) {
        const cell = event.target;
        const index = parseInt(cell.dataset.index);
        
        if (!cell.textContent && !game.isAITurn) {  // Only allow clicks during human turn
            const result = game.makeMove(index);
            
            if (result === true || result === 'win' || result === 'draw') {
                cell.textContent = 'O';  // Explicitly set O for human moves
                
                if (result === 'win') {
                    setTimeout(() => {
                        const winner = game.currentPlayer;
                        const winnerName = winner === 'O' ? 'Cat Bus' : 'Totoro';
                        showModal(`${winnerName} wins the game! ✨`, winner);
                        scoreboard.updateScore(winner);
                    }, 100);
                } else if (result === 'draw') {
                    setTimeout(() => {
                        showModal(null, 'draw');
                        scoreboard.updateTies();
                    }, 100);
                } else {
                    // AI's turn
                    setTimeout(makeAIMove, 500);
                }
            }
        }
    }

    function makeAIMove() {
        const currentBoard = [...cells].map(cell => cell.textContent || null);
        const bestMove = AI.getBestMove(currentBoard);
        if (bestMove !== null) {
            const cell = cells[bestMove];
            const result = game.makeMove(bestMove);
            
            if (result === true || result === 'win' || result === 'draw') {
                cell.textContent = 'X';  // Explicitly set X for AI moves
                
                if (result === 'win') {
                    setTimeout(() => {
                        const winner = game.currentPlayer;
                        const winnerName = winner === 'O' ? 'Cat Bus' : 'Totoro';
                        showModal(`${winnerName} wins the game! ✨`, winner);
                        scoreboard.updateScore(winner);
                    }, 100);
                } else if (result === 'draw') {
                    setTimeout(() => {
                        showModal(null, 'draw');
                        scoreboard.updateTies();
                    }, 100);
                }
            }
        }
    }

    // Add event listeners for the game board
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    // Add event listener for the "Start New Game" button
    startGameBtn.addEventListener('click', () => {
        game.reset();
        cells.forEach(cell => cell.textContent = '');
    });

    // Add modal close handler
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Initialize game
    game.reset();
});