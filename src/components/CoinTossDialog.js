class CoinTossDialog {

    #idTemplate = 'coin_toss_dialog_template';
    #idDialog = 'coin_toss_dialog';
    #idButtonContinue = 'coin_toss_button_continue';
    #idTitle = 'coin_toss_dialog_title';
    #idSpinner = 'coin_toss_spinner';
    
    #refTemplate = null;
    #drefDialog = null;
    #refButtonContinue = null;
    #refTitle = null;
    #refSpinner = null;
    
    #onContinue = null;
    #boundHandleContinue = null;

    constructor() {
        this.#refTemplate = document.getElementById(this.#idTemplate);
        if (!this.#refTemplate) {
            throw new Error(`Template with id '${this.#idTemplate}' not found.`);
        }
    }

    onContinue(listener) {
        if (listener && typeof listener === "function") {
            this.#onContinue = listener;
        } else {
            throw new Error(`Invalid listener: ${listener}`);
        }
    }

    open() {
        if (this.#drefDialog === null) {
            this.#createDialog();
        }
        this.#refButtonContinue.disabled = true;
        this.#drefDialog.showModal();
    }

    showResult(token) {
        if (this.#refTitle && this.#refButtonContinue && this.#refSpinner) {
            this.#refTitle.textContent = `Player ${token} starts`;
            this.#refButtonContinue.disabled = false;
            this.#refSpinner.hidden = true;
        }
    }

    #close() {
        if (this.#drefDialog !== null) {
            this.#drefDialog.close();
            this.#destroyDialog();
        }
    }

    #handleContinue(event) {
        if (this.#onContinue) {
            this.#onContinue();
        }
        this.#close();
    }

    #createDialog() {
        const clone = this.#refTemplate.content.cloneNode(true);
        document.body.appendChild(clone);

        this.#drefDialog = document.getElementById(this.#idDialog);
        this.#refTitle = document.getElementById(this.#idTitle);
        this.#refButtonContinue = document.getElementById(this.#idButtonContinue);
        this.#refSpinner = document.getElementById(this.#idSpinner);

        this.#boundHandleContinue = (e) => this.#handleContinue(e);
        this.#refButtonContinue.addEventListener('click', this.#boundHandleContinue);
    }

    #destroyDialog() {
        if (this.#refButtonContinue) {
            this.#refButtonContinue.removeEventListener('click', this.#boundHandleContinue);
        }

        document.body.removeChild(this.#drefDialog);
        
        this.#drefDialog = null;
        this.#refButtonContinue = null;
        this.#boundHandleContinue = null;
    }

}

export default CoinTossDialog;