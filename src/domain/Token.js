const Token = Object.freeze({
    X: Symbol('✖️'),
    O: Symbol('⭕'),
    EMPTY: Symbol(''),

    isValid(value) {
        return value === this.X || value === this.O || value === this.EMPTY;
    },

    from(value) {
        switch (value.toUpperCase()) {
            case 'X':
                return this.X;
            case 'O':
                return this.O;
            default:
                throw new Error(`Unknown token: ${value}`);
        }
    },

    inverse(token) {
        if (!Token.isValid(token)) {
            throw new Error(`Invalid token: ${token}`);
        }
        if (token === this.X) {
            return this.O;
        }
        if (token === this.O) {
            return this.X;
        }
        return this.EMPTY;
    },
    
    pickRandom() {
        return Math.random() > 0.5 ? this.X : this.O;
    }
    
});

export default Token;
