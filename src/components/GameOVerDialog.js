class GameOverDialog {

    #idTemplate = 'game_over_dialog_template';
    #idDialog = 'game_over_dialog';
    #idTitle = 'game_over_dialog_title';
    #idButtonContinue = 'game_over_continue';
    #idButtonStop = 'game_over_stop';

    #refTemplate = null;
    #drefDialog = null;
    #refMessage = null;
    #refButtonContinue = null;
    #refButtonStop = null;

    #onRestart = null;
    #onStop = null;
    #boundHandleRestart = null;
    #boundHandleStop = null;

    constructor() {
        this.#refTemplate = document.getElementById(this.#idTemplate);
        if (!this.#refTemplate) {
            throw new Error(`Template '${this.#idTemplate}' not found.`);
        }
    }

    onRestart(listener) {
        if (typeof listener === "function") this.#onRestart = listener;
    }

    onStop(listener) {
        if (typeof listener === "function") this.#onStop = listener;
    }

    openAsWin(winnerToken) {
        this.#createDialog();
        this.#refMessage.textContent = `Player ${winnerToken} wins! 🎉`;
        this.#drefDialog.showModal();
    }

    openAsDraw() {
        this.#createDialog();
        this.#refMessage.textContent = `It's a draw! 🤝`;
        this.#drefDialog.showModal();
    }

    #close() {
        if (this.#drefDialog !== null) {
            this.#drefDialog.close();
            this.#destroyDialog();
        }
    }

    #createDialog() {
        const clone = this.#refTemplate.content.cloneNode(true);
        document.body.appendChild(clone);

        this.#drefDialog = document.getElementById(this.#idDialog);
        this.#refMessage = document.getElementById(this.#idTitle);
        this.#refButtonContinue = document.getElementById(this.#idButtonContinue);
        this.#refButtonStop = document.getElementById(this.#idButtonStop);

        this.#boundHandleRestart = () => {
            this.#close();
            if (this.#onRestart) this.#onRestart();
        };

        this.#boundHandleStop = () => {
            this.#close();
            if (this.#onStop) this.#onStop();
        };

        this.#refButtonContinue.addEventListener('click', this.#boundHandleRestart);
        this.#refButtonStop.addEventListener('click', this.#boundHandleStop);
    }

    #destroyDialog() {
        if (this.#refButtonContinue && this.#refButtonStop) {
            this.#refButtonContinue.removeEventListener('click', this.#boundHandleRestart);
            this.#refButtonStop.removeEventListener('click', this.#boundHandleStop);
        }

        document.body.removeChild(this.#drefDialog);
        this.#drefDialog = null;
        this.#refMessage = null;
        this.#refButtonContinue = null;
        this.#refButtonStop = null;
    }
}

export default GameOverDialog;