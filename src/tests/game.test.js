import { Game } from '../js/game.js';
import { Player } from '../js/player.js';
import { AI } from '../js/ai.js';

describe('Game Logic Tests', () => {
    let game;
    let playerX;
    let playerO;
    let ai;

    beforeEach(() => {
        playerX = new Player('X');
        playerO = new Player('O');
        ai = new AI('O');
        game = new Game(playerX, playerO);
    });

    test('should initialize the game board correctly', () => {
        expect(game.board).toEqual(['', '', '', '', '', '', '', '', '']);
    });

    test('should allow a player to make a move', () => {
        game.makeMove(0, playerX);
        expect(game.board[0]).toBe('X');
    });

    test('should not allow a move on an occupied space', () => {
        game.makeMove(0, playerX);
        expect(() => game.makeMove(0, playerO)).toThrow('Space already occupied');
    });

    test('should check for a winner', () => {
        game.makeMove(0, playerX);
        game.makeMove(1, playerX);
        game.makeMove(2, playerX);
        expect(game.checkWinner()).toBe('X');
    });

    test('should return null if there is no winner yet', () => {
        game.makeMove(0, playerX);
        game.makeMove(1, playerO);
        expect(game.checkWinner()).toBe(null);
    });

    test('should allow AI to make a move', () => {
        game.makeMove(0, playerX);
        ai.makeMove(game);
        expect(game.board.includes('O')).toBe(true);
    });
});