const Token = Object.freeze({
    X: Symbol('X'),
    O: Symbol('O'),
    EMPTY: Symbol(''),
    isValid(value) {
        return value === this.X || value === this.O || value === this.EMPTY;
    }
});

export default Token;
