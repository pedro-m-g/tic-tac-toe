class SetupDialog {

    #idTemplate = 'setup_dialog_template';
    #idDialog = 'setup_dialog';
    #idButtonX = 'setup_button_x';
    #idButtonO = 'setup_button_o';
    
    #refTemplate = null;
    #refDialog = null;
    #refButtonSelectX = null;
    #refButtonSelectO = null;
    
    #onSelect = null;
    #boundHandleSelect = null;
    #boundHandleClose = null;
    #boundPreventEsc = null;

    constructor() {
        this.#refTemplate = document.getElementById(this.#idTemplate);
        if (!this.#refTemplate) {
            throw new Error(`Template with id '${this.#idTemplate}' not found.`);
        }
    }

    onSelect(listener) {
        if (listener && typeof listener === "function") {
            this.#onSelect = listener;
        } else {
            throw new Error(`Invalid listener: ${listener}`);
        }
    }

    open() {
        if (this.#refDialog === null) {
            this.#createDialog();
        }
        this.#refDialog.showModal();
    }

    #close() {
        if (this.#refDialog !== null) {
            this.#refDialog.close();
            this.#destroyDialog();
        }
    }

    #handleSelect(event) {
        const token = event.currentTarget.dataset.token;
        
        if (this.#onSelect) {
            this.#onSelect(token);
        }
        this.#close();
    }

    #createDialog() {
        const clone = this.#refTemplate.content.cloneNode(true);
        document.body.appendChild(clone);

        this.#refDialog = document.getElementById(this.#idDialog);
        this.#refButtonSelectX = document.getElementById(this.#idButtonX);
        this.#refButtonSelectO = document.getElementById(this.#idButtonO);

        this.#boundHandleSelect = (e) => this.#handleSelect(e);
        this.#boundHandleClose = (e) => e.preventDefault();
        this.#boundPreventEsc = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
            }
        };

        this.#refDialog.addEventListener('cancel', this.#boundHandleClose);
        this.#refDialog.addEventListener('keydown', this.#boundPreventEsc);
        this.#refButtonSelectX.addEventListener('click', this.#boundHandleSelect);
        this.#refButtonSelectO.addEventListener('click', this.#boundHandleSelect);
    }

    #destroyDialog() {
        if (this.#refDialog && this.#refButtonSelectX && this.#refButtonSelectO) {
            this.#refDialog.removeEventListener('cancel', this.#boundHandleClose);
            this.#refDialog.removeEventListener('keydown', this.#boundPreventEsc);
            this.#refButtonSelectX.removeEventListener('click', this.#boundHandleSelect);
            this.#refButtonSelectO.removeEventListener('click', this.#boundHandleSelect);
        }

        document.body.removeChild(this.#refDialog);
        
        this.#refDialog = null;
        this.#refButtonSelectX = null;
        this.#refButtonSelectO = null;
        this.#boundHandleSelect = null;
    }
}

export default SetupDialog;