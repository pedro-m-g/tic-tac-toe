class BoardView {

    #idStatusMessage = 'status_message';
    #idBoard = 'board';
    #queryTiles = '.tile';
    
    #refStatusMessage = null;
    #refBoard = null;
    #refTiles = [];

    #onTileClicked = null;

    constructor() {
        this.#refStatusMessage = document.getElementById(this.#idStatusMessage);
        this.#refBoard = document.getElementById(this.#idBoard);
        this.#refTiles = Array.from(document.querySelectorAll(this.#queryTiles));

        for (let tile of this.#refTiles) {
            tile.addEventListener('click', (e) => this.#handleTileClicked(e));
        }
    }

    onTileClicked(listener) {
        if (listener && typeof listener === "function") {
            this.#onTileClicked = listener;
        } else {
            throw new Error(`Invalid listener: ${listener}`);
        }
    }

    updateCurrentPlayer(currentPlayer) {
        this.#refStatusMessage.textContent = `Current Player: ${currentPlayer}`;
    }

    updateToken(index, token) {
        this.#refTiles[index].textContent = token;
        this.#refTiles[index].disabled = true;
    }

    reset() {
        this.#refStatusMessage.textContent = '';
        for (let tile of this.#refTiles) {
            tile.innerHTML = '&nbsp;';
            tile.disabled = false;
        }
    }

    #handleTileClicked(event) {
        const index = Number(event.currentTarget.dataset.index);
        if (this.#onTileClicked) {
            this.#onTileClicked(index);
        }
    }

}

export default BoardView;