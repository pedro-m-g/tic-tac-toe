class CoinTossDialog {

    #idTemplate = 'coin_toss_dialog_template';
    #idDialog = 'coin_toss_dialog';
    #idButtonContinue = 'coin_toss_button_continue';
    #idTitle = 'coin_toss_dialog_title';
    #idSpinner = 'coin_toss_spinner';
    
    #refTemplate = null;
    #refDialog = null;
    #refButtonContinue = null;
    #refTitle = null;
    #refSpinner = null;
    
    #onContinue = null;
    #boundHandleContinue = null;
    #boundHandleClose = null;
    #boundPreventEsc = null;

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
        if (this.#refDialog === null) {
            this.#createDialog();
        }
        this.#refButtonContinue.disabled = true;
        this.#refDialog.showModal();
    }

    showResult(token) {
        if (this.#refTitle && this.#refButtonContinue && this.#refSpinner) {
            this.#refTitle.textContent = `Player ${token} starts`;
            this.#refButtonContinue.disabled = false;
            this.#refSpinner.hidden = true;
        }
    }

    #close() {
        if (this.#refDialog !== null) {
            this.#refDialog.close();
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

        this.#refDialog = document.getElementById(this.#idDialog);
        this.#refTitle = document.getElementById(this.#idTitle);
        this.#refButtonContinue = document.getElementById(this.#idButtonContinue);
        this.#refSpinner = document.getElementById(this.#idSpinner);

        this.#boundHandleContinue = (e) => this.#handleContinue(e);
        this.#boundHandleClose = (e) => e.preventDefault();
        this.#boundPreventEsc = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
            }
        };

        this.#refDialog.addEventListener('cancel', this.#boundHandleClose);
        this.#refDialog.addEventListener('keydown', this.#boundPreventEsc);
        this.#refButtonContinue.addEventListener('click', this.#boundHandleContinue);
    }

    #destroyDialog() {
        if (this.#refDialog && this.#refButtonContinue) {
            this.#refDialog.removeEventListener('cancel', this.#boundHandleClose);
            this.#refDialog.removeEventListener('keydown', this.#boundPreventEsc);
            this.#refButtonContinue.removeEventListener('click', this.#boundHandleContinue);
        }

        document.body.removeChild(this.#refDialog);
        
        this.#refDialog = null;
        this.#refButtonContinue = null;
        this.#boundHandleContinue = null;
    }

}

export default CoinTossDialog;