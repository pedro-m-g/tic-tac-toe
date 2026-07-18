import GameState from "./GameState";

describe('GameState', () => {

    test('state constants are valid', () => {
        expect(GameState.isValid(GameState.DRAW)).toBe(true);
        expect(GameState.isValid(GameState.WON)).toBe(true);
        expect(GameState.isValid(GameState.PLAYING)).toBe(true);
    });

    test('states are unique', () => {
        expect(GameState.isValid(Symbol('DRAW'))).toBe(false);
        expect(GameState.isValid(Symbol('WON'))).toBe(false);
        expect(GameState.isValid(Symbol('PLAYING'))).toBe(false);
    });

    test('exotic values are not valid states', () => {
        expect(GameState.isValid(null)).toBe(false);
        expect(GameState.isValid(undefined)).toBe(false);
        expect(GameState.isValid('')).toBe(false);
        expect(GameState.isValid(0)).toBe(false);
    });
    
});
