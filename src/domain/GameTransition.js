import GameState from './GameState';
import Token from './Token';

class GameTransition {

    #state;
    #winner;
    #combination;

    constructor(state, winner = null, combination = []) {
        if (!state || !GameState.isValid(state)) {
            throw new Error(`state is not valid: ${state}`);
        }
        if (state === GameState.WON && (!Token.isValid(winner) || !(combination instanceof Array) || combination.length !== 3)) {
            throw new Error('Must define a winner and victory combination for WON state');
        }
        if (state !== GameState.WON && (winner !== null || !(combination instanceof Array) || combination.length !== 0)) {
            console.warn('states different than WON will ignore winner and victory combination');
        }

        this.#state = state;
        this.#winner = winner;
        this.#combination = Object.freeze([...combination]);
    }

    get state() {
        return this.#state;
    }

    get winner() {
        return this.#winner;
    }

    get combination() {
        return this.#combination;
    }

    isGameOver() {
        return this.#state === GameState.WON || this.#state === GameState.DRAW
    }

}

export default GameTransition;
