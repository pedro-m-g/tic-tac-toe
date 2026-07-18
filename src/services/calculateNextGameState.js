import Board from '../domain/Board';
import Token from '../domain/Token';
import GameTransition from '../domain/GameTransition';
import GameState from '../domain/GameState';

const VICTORY_COMBINATIONS = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal
    [0, 4, 8],
    [2, 4, 6]
];

/**
 * Determines the next game state from the current board.
 * @param {Board} board - The current game board.
 * @return {GameTransition} The transition to the won, draw, or playing state.
 * @throws {Error} If `board` is not a valid `Board` instance.
 */
function calculateNextGameState(board) {
    if (!board || !(board instanceof Board)) {
        throw new Error('Must provide a valid board');
    }

    for (let combination of VICTORY_COMBINATIONS) {
        const [a, b, c] = combination;
        const firstToken = board.tileAt(a);
        if (firstToken !== Token.EMPTY && board.tileAt(b) === firstToken && board.tileAt(c) === firstToken) {
            return new GameTransition(GameState.WON, firstToken, combination);
        }
    }

    // Check only if no victory was detected
    if (board.isFull()) {
        return new GameTransition(GameState.DRAW);
    }

    return new GameTransition(GameState.PLAYING);
}

export default calculateNextGameState;
