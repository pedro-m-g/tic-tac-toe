class SetupDialog {

    #idTemplate = 'setup_dialog_template';
    #idDialog = 'setup_dialog';
    #idButtonX = 'setup_button_x';
    #idButtonO = 'setup_button_o';
    
    #refTemplate = null;
    #drefDialog = null;
    #refButtonSelectX = null;
    #refButtonSelectO = null;
    
    #onSelect = null;
    #boundHandleSelect = null;

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
        if (this.#drefDialog === null) {
            this.#createDialog();
        }
        this.#drefDialog.showModal();
    }

    #close() {
        if (this.#drefDialog !== null) {
            this.#drefDialog.close();
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

        this.#drefDialog = document.getElementById(this.#idDialog);
        this.#refButtonSelectX = document.getElementById(this.#idButtonX);
        this.#refButtonSelectO = document.getElementById(this.#idButtonO);

        this.#boundHandleSelect = (e) => this.#handleSelect(e);

        this.#refButtonSelectX.addEventListener('click', this.#boundHandleSelect);
        this.#refButtonSelectO.addEventListener('click', this.#boundHandleSelect);
    }

    #destroyDialog() {
        if (this.#refButtonSelectX && this.#refButtonSelectO) {
            this.#refButtonSelectX.removeEventListener('click', this.#boundHandleSelect);
            this.#refButtonSelectO.removeEventListener('click', this.#boundHandleSelect);
        }

        document.body.removeChild(this.#drefDialog);
        
        this.#drefDialog = null;
        this.#refButtonSelectX = null;
        this.#refButtonSelectO = null;
        this.#boundHandleSelect = null;
    }
}

export default SetupDialog;