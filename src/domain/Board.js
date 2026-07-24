import Token from './Token';

const SIZE = 9;

class Board {

    constructor() {
        this.tiles = Array(SIZE).fill(Token.EMPTY);
    }

    placeToken(tileIndex, token) {
        if (tileIndex < 0 || tileIndex >= SIZE) {
            throw new Error(`Index out of bounds: ${tileIndex}, allowed values: 0-${SIZE - 1}`);
        }
        if (this.tiles[tileIndex] !== Token.EMPTY) {
            throw new Error(`Tile already in place for index: ${tileIndex}`);
        }
        if (!Token.isValid(token)) {
            throw new Error(`Invalid token: ${token}`);
        }

        this.tiles[tileIndex] = token;
    }

    tileAt(tileIndex) {
        if (tileIndex < 0 || tileIndex >= SIZE) {
            throw new Error(`Index out of bounds: ${tileIndex}, allowed values: 0-${SIZE - 1}`);
        }

        return this.tiles[tileIndex];
    }

    isTileAvailable(index) {
        return this.tileAt(index) === Token.EMPTY;
    }

    isTileOccupied(index) {
        return !this.isTileAvailable(index);
    }

    isFull() {
        return this.tiles.every(token => token !== Token.EMPTY);
    }

}

export default Board;
