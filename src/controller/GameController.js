import CoinTossDialog from "../components/CoinTossDialog";
import SetupDialog from "../components/SetupDialog";
import Token from "../domain/Token";
import Board from "../domain/Board";
import calculateNextGameState from "../services/calculateNextGameState";
import GameState from "../domain/GameState";

class GameController {

    #setupDialog = null;
    #coinTossDialog = null;
    #boardView = null;
    #gameOverDialog = null;

    #coinTossDelayMs = null;

    #player1 = null;
    #player2 = null;
    #currentPlayer = null;

    #board = null;

    constructor({
        setupDialog,
        coinTossDialog,
        coinTossDelayMs = 1500,
        boardView,
        gameOverDialog
    }) {
        this.#coinTossDelayMs = coinTossDelayMs;

        this.#setupDialog = setupDialog;
        this.#coinTossDialog = coinTossDialog;
        this.#boardView = boardView;
        this.#gameOverDialog = gameOverDialog;

        this.#setupDialog.onSelect((token) => this.#selectFirstPlayerToken(token));
        this.#coinTossDialog.onContinue(() => this.#startBoard());
        this.#boardView.onTileClicked((index) => this.#selectTile(index));
        this.#gameOverDialog.onRestart(() => this.#resetGame());
        this.#gameOverDialog.onStop(() => console.log('Game finished by user.'));

        this.#board = new Board();
    }

    start() {
        this.#setupDialog.open();
    }

    #selectFirstPlayerToken(tokenString) {
        this.#player1 = Token.from(tokenString);
        this.#player2 = Token.inverse(this.#player1);

        this.#coinTossDialog.open();
        setTimeout(() => {
            this.#currentPlayer = Token.pickRandom();
            this.#coinTossDialog.showResult(this.#currentPlayer.description);
        }, this.#coinTossDelayMs);
    }

    #startBoard() {
        this.#boardView.updateCurrentPlayer(this.#currentPlayer.description);
    }

    #selectTile(index) {
        if (this.#board.isTileOccupied(index)) {
            return;
        }
        this.#board.placeToken(index, this.#currentPlayer);
        this.#boardView.updateToken(index, this.#currentPlayer.description);

        const transition = calculateNextGameState(this.#board);

        switch (transition.state) {
            case GameState.DRAW:
                this.#gameOverDialog.openAsDraw();
                break;
            case GameState.WON:
                this.#gameOverDialog.openAsWin(this.#currentPlayer.description);
                break;
            case GameState.PLAYING:
                this.#currentPlayer = Token.inverse(this.#currentPlayer);
                this.#boardView.updateCurrentPlayer(this.#currentPlayer.description);
                break;
        }
    }

    #resetGame() {
        this.#board = new Board();
        this.#boardView.reset();
        this.start();
    }

}

export default GameController;