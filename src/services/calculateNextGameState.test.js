import Board from '../domain/Board';
import Token from '../domain/Token';
import GameTransition from '../domain/GameTransition';
import GameState from '../domain/GameState';
import calculateNextGameState from './calculateNextGameState';

describe('calculateNextGameState', () => {

    let board;

    beforeEach(() => {
        board = new Board(); // Set up a new board for each test
    });

    test('should return PLAYING state when the board is completely empty', () => {
        const transition = calculateNextGameState(board);

        expect(transition).toBeInstanceOf(GameTransition);
        expect(transition.state).toBe(GameState.PLAYING);
        expect(transition.winner).toBeNull();
        expect(transition.combination).toEqual([]);
        expect(transition.isGameOver()).toBe(false);
    });

    test('should return PLAYING state when a match is ongoing without lines', () => {
        // X | X |   
        //   | O |   
        //   |   |   
        board.placeToken(0, Token.X);
        board.placeToken(4, Token.O);
        board.placeToken(1, Token.X);

        const transition = calculateNextGameState(board);
        expect(transition.state).toBe(GameState.PLAYING);
        expect(transition.isGameOver()).toBe(false);
    });

    test('should detect a horizontal victory correctly', () => {
        // X | X | X    <- winner
        // O | O |   
        //   |   |   
        board.placeToken(0, Token.X);
        board.placeToken(3, Token.O);
        board.placeToken(1, Token.X);
        board.placeToken(4, Token.O);
        board.placeToken(2, Token.X);

        const transition = calculateNextGameState(board);

        expect(transition.state).toBe(GameState.WON);
        expect(transition.winner).toBe(Token.X);
        expect(transition.combination).toEqual([0, 1, 2]);
        expect(transition.isGameOver()).toBe(true);
    });

    test('should detect a diagonal victory correctly', () => {
        // X | X | O    <- winner (diagonal)
        //   | O |   
        // O |   |   
        board.placeToken(2, Token.O);
        board.placeToken(0, Token.X);
        board.placeToken(4, Token.O);
        board.placeToken(1, Token.X);
        board.placeToken(6, Token.O);

        const transition = calculateNextGameState(board);

        expect(transition.state).toBe(GameState.WON);
        expect(transition.winner).toBe(Token.O);
        expect(transition.combination).toEqual([2, 4, 6]);
    });

    test('should detect a DRAW state when board is full and there is no winner', () => {
        // X | O | X 
        // X | O | O 
        // O | X | X 
        const moves = [
            { idx: 0, tok: Token.X }, { idx: 1, tok: Token.O }, { idx: 2, tok: Token.X },
            { idx: 3, tok: Token.X }, { idx: 4, tok: Token.O }, { idx: 5, tok: Token.O },
            { idx: 7, tok: Token.X }, { idx: 6, tok: Token.O }, { idx: 8, tok: Token.X }
        ];
        moves.forEach(m => board.placeToken(m.idx, m.tok));

        const transition = calculateNextGameState(board);

        expect(transition.state).toBe(GameState.DRAW);
        expect(transition.winner).toBeNull();
        expect(transition.isGameOver()).toBe(true);
    });

    test('should prioritize WON over DRAW on the last move', () => {
        // X | X | O 
        // O | X | X 
        // O | O | X    <- winner (diagonal, last move)
        const initialMoves = [
            { idx: 0, tok: Token.X }, { idx: 1, tok: Token.X }, { idx: 2, tok: Token.O },
            { idx: 3, tok: Token.O }, { idx: 4, tok: Token.X }, { idx: 5, tok: Token.X },
            { idx: 6, tok: Token.O }, { idx: 7, tok: Token.O }
        ];
        initialMoves.forEach(m => board.placeToken(m.idx, m.tok));

        // Last move fills the board and makes X winner
        board.placeToken(8, Token.X);

        const transition = calculateNextGameState(board);

        // Must detect victory before draw (full board)
        expect(transition.state).toBe(GameState.WON);
        expect(transition.winner).toBe(Token.X);
        expect(transition.combination).toEqual([0, 4, 8]);
    });

    test('should crash if input is not a valid Board instance', () => {
        expect(() => calculateNextGameState(null)).toThrow('Must provide a valid board');
        expect(() => calculateNextGameState({})).toThrow('Must provide a valid board');
    });
    
});