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
        
        if (!cell.getAttribute('data-content') && !game.isAITurn) {
            const result = game.makeMove(index);
            cell.setAttribute('data-content', 'O');
            
            if (result === 'win') {
                setTimeout(() => {
                    showModal(`Cat Bus wins the game! ✨`, 'O');
                    scoreboard.updateScore('O');
                }, 100);
            } else if (result === 'draw') {
                setTimeout(() => {
                    showModal(null, 'draw');
                    scoreboard.updateTies();
                }, 100);
            } else {
                game.isAITurn = true;
                setTimeout(makeAIMove, 500);
            }
        }
    }

    function makeAIMove() {
        const currentBoard = [...cells].map(cell => cell.getAttribute('data-content') || null);
        const bestMove = AI.getBestMove(currentBoard);
        
        if (bestMove !== null) {
            const cell = cells[bestMove];
            const result = game.makeMove(bestMove);
            cell.setAttribute('data-content', 'X');
            
            if (result === 'win') {
                setTimeout(() => {
                    showModal(`Totoro wins the game! ✨`, 'X');
                    scoreboard.updateScore('X');
                }, 100);
            } else if (result === 'draw') {
                setTimeout(() => {
                    showModal(null, 'draw');
                    scoreboard.updateTies();
                }, 100);
            }
            game.isAITurn = false;
        }
    }

    // Add event listeners for the game board
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    // Add event listener for the "Start New Game" button
    startGameBtn.addEventListener('click', () => {
        game.reset();
        cells.forEach(cell => {
            cell.setAttribute('data-content', '');
        });
        game.isAITurn = false;
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