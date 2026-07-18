import GameTransition from './GameTransition';
import GameState from './GameState';
import Token from './Token';

describe('GameTransition Value Object', () => {
    
    test('should create a PLAYING transition properly', () => {
        const transition = new GameTransition(GameState.PLAYING);
        
        expect(transition.state).toBe(GameState.PLAYING);
        expect(transition.winner).toBeNull();
        expect(transition.combination).toEqual([]);
        expect(transition.isGameOver()).toBe(false);
    });

    test('should create a DRAW transition properly', () => {
        const transition = new GameTransition(GameState.DRAW);
        
        expect(transition.state).toBe(GameState.DRAW);
        expect(transition.winner).toBeNull();
        expect(transition.combination).toEqual([]);
        expect(transition.isGameOver()).toBe(true);
    });

    test('should create a WON transition with valid parameters', () => {
        const winningLine = [0, 1, 2];
        const transition = new GameTransition(GameState.WON, Token.X, winningLine);
        
        expect(transition.state).toBe(GameState.WON);
        expect(transition.winner).toBe(Token.X);
        expect(transition.combination).toEqual([0, 1, 2]);
        expect(transition.isGameOver()).toBe(true);
    });

    test('should guarantee that the combination array is frozen/immutable', () => {
        const winningLine = [3, 4, 5];
        const transition = new GameTransition(GameState.WON, Token.O, winningLine);
        
        expect(Object.isFrozen(transition.combination)).toBe(true);
    });

    test('should crash if state is invalid', () => {
        expect(() => new GameTransition('UNKOWN_STATE')).toThrow(Error);
        expect(() => new GameTransition(null)).toThrow(Error);
    });

    test('should crash if WON state lacks winner or combination', () => {
        // WON state with no winner
        expect(() => new GameTransition(GameState.WON, null, [0, 4, 8])).toThrow(Error);
        
        // WON state with an incomplete victory combination
        expect(() => new GameTransition(GameState.WON, Token.X, [0, 1])).toThrow(Error);
        
        // WON state with non-array victory combinatino
        expect(() => new GameTransition(GameState.WON, Token.X, "0, 1, 2")).toThrow(Error);

        // WON state with non-valid token
        expect(() => new GameTransition(GameState.WON, 'X', [0, 4, 8])).toThrow(Error);
    });
    
});
