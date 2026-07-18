import Token from './Token';

describe('Token', () => {

    test('token constants are valid', () => {
        expect(Token.isValid(Token.X)).toBe(true);
        expect(Token.isValid(Token.O)).toBe(true);
        expect(Token.isValid(Token.EMPTY)).toBe(true);
    });

    test('tokens are unique', () => {
        expect(Token.isValid(Symbol('X'))).toBe(false);
        expect(Token.isValid(Symbol('O'))).toBe(false);
        expect(Token.isValid(Symbol(''))).toBe(false);
    });

    test('exotic values are not valid tokens', () => {
        expect(Token.isValid(null)).toBe(false);
        expect(Token.isValid(undefined)).toBe(false);
        expect(Token.isValid('')).toBe(false);
        expect(Token.isValid(0)).toBe(false);
    });

});
