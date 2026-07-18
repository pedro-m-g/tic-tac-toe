const GameState = Object.freeze({
    DRAW: Symbol('DRAW'),
    WON: Symbol('WON'),
    PLAYING: Symbol('PLAYING'),
    isValid(value) {
        return value === this.DRAW || value === this.WON || value === this.PLAYING;
    }
});

export default GameState;
