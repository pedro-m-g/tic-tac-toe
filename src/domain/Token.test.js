import Token from './Token';

describe('Token', () => {

    test('should mark token constants as valid', () => {
        expect(Token.isValid(Token.X)).toBe(true);
        expect(Token.isValid(Token.O)).toBe(true);
        expect(Token.isValid(Token.EMPTY)).toBe(true);
    });

    test('should mark non-registered tokens as invalid', () => {
        expect(Token.isValid(Symbol('X'))).toBe(false);
        expect(Token.isValid(Symbol('O'))).toBe(false);
        expect(Token.isValid(Symbol(''))).toBe(false);
    });

    test('should mark falsy values as invalid', () => {
        expect(Token.isValid(null)).toBe(false);
        expect(Token.isValid(undefined)).toBe(false);
        expect(Token.isValid('')).toBe(false);
        expect(Token.isValid(0)).toBe(false);
    });

});
