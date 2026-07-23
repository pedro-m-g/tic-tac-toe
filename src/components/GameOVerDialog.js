class GameOverDialog {

    #idTemplate = 'game_over_dialog_template';
    #idDialog = 'game_over_dialog';
    #idTitle = 'game_over_dialog_title';
    #idButtonContinue = 'game_over_continue';
    #idButtonStop = 'game_over_stop';

    #refTemplate = null;
    #refDialog = null;
    #refMessage = null;
    #refButtonContinue = null;
    #refButtonStop = null;

    #onRestart = null;
    #onStop = null;
    #boundHandleRestart = null;
    #boundHandleStop = null;
    #boundHandleClose = null;
    #boundPreventEsc = null;

    constructor() {
        this.#refTemplate = document.getElementById(this.#idTemplate);
        if (!this.#refTemplate) {
            throw new Error(`Template '${this.#idTemplate}' not found.`);
        }
    }

    onRestart(listener) {
        if (typeof listener === "function") {
            this.#onRestart = listener;
        } else {
            throw new Error(`Invalid listener: ${listener}`);
        }
    }

    onStop(listener) {
        if (typeof listener === "function") {
            this.#onStop = listener;
        } else {
            throw new Error(`Invalid listener: ${listener}`);
        }
    }

    openAsWin(winnerToken) {
        if (this.#refDialog === null) {
            this.#createDialog();
        }
        this.#refMessage.textContent = `Player ${winnerToken} wins! 🎉`;
        this.#refDialog.showModal();
    }

    openAsDraw() {
        if (this.#refDialog === null) {
            this.#createDialog();
        }
        this.#refMessage.textContent = `It's a draw! 🤝`;
        this.#refDialog.showModal();
    }

    #close() {
        if (this.#refDialog !== null) {
            this.#refDialog.close();
            this.#destroyDialog();
        }
    }

    #createDialog() {
        const clone = this.#refTemplate.content.cloneNode(true);
        document.body.appendChild(clone);

        this.#refDialog = document.getElementById(this.#idDialog);
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

        this.#boundHandleClose = (e) => e.preventDefault();
        this.#boundPreventEsc = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
            }
        };

        this.#refDialog.addEventListener('cancel', this.#boundHandleClose);
        this.#refDialog.addEventListener('keydown', this.#boundPreventEsc);
        this.#refButtonContinue.addEventListener('click', this.#boundHandleRestart);
        this.#refButtonStop.addEventListener('click', this.#boundHandleStop);
    }

    #destroyDialog() {
        if (this.#refDialog && this.#refButtonContinue && this.#refButtonStop) {
            this.#refDialog.removeEventListener('cancel', this.#boundHandleClose);
            this.#refDialog.removeEventListener('keydown', this.#boundPreventEsc);
            this.#refButtonContinue.removeEventListener('click', this.#boundHandleRestart);
            this.#refButtonStop.removeEventListener('click', this.#boundHandleStop);
        }

        document.body.removeChild(this.#refDialog);
        this.#refDialog = null;
        this.#refMessage = null;
        this.#refButtonContinue = null;
        this.#refButtonStop = null;
    }
}

export default GameOverDialog;