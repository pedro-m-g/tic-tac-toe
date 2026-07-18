import Board from "./Board";
import Token from "./Token";

describe('Board', () => {

    test('should initialize with all tiles empty when creating a new board', () => {
        const board = new Board();
        for (let i = 0; i < 9; i++) {
            expect(board.tileAt(i)).toBe(Token.EMPTY);
        }
    });

    test('should record the token at the correct index when placing a token', () => {
        const board = new Board();
        board.placeToken(3, Token.O);
        board.placeToken(6, Token.X);

        expect(board.tileAt(3)).toBe(Token.O);
        expect(board.tileAt(6)).toBe(Token.X);
        // Other tiles are not affected
        expect(board.tileAt(0)).toBe(Token.EMPTY);
    });

    test('should be full when all tiles are occupied', () => {
        const board = new Board();

        expect(board.isFull()).toBe(false);

        board.placeToken(0, Token.X);
        expect(board.isFull()).toBe(false);

        for (let i = 1; i <= 7; i++) {
            board.placeToken(i, Token.O);
        }
        expect(board.isFull()).toBe(false);

        board.placeToken(8, Token.X);
        expect(board.isFull()).toBe(true);
    });

    test('should throw when placing a token out of board bounds', () => {
        const board = new Board();
        expect(() => board.placeToken(-1, Token.X)).toThrow(Error);
        expect(() => board.placeToken(9, Token.X)).toThrow(Error);
    });

    test('should throw when querying an index out of board bounds', () => {
        const board = new Board();
        expect(() => board.tileAt(-1)).toThrow(Error);
        expect(() => board.tileAt(9)).toThrow(Error);
    });

    test('should throw when placing a token on an occupied tile', () => {
        const board = new Board();
        board.placeToken(4, Token.X);
        
        expect(() => board.placeToken(4, Token.O)).toThrow(Error);
        expect(board.tileAt(4)).toBe(Token.X);
    });

    test('should throw when placing an invalid token', () => {
        const board = new Board();
        
        expect(() => board.placeToken(4, 'A random string')).toThrow(Error);
        expect(() => board.placeToken(4, null)).toThrow(Error);
        expect(() => board.placeToken(4, Symbol('X'))).toThrow(Error);
        
        expect(board.tileAt(4)).toBe(Token.EMPTY);
    });

});
