import { Injectable, signal } from '@angular/core';
import { ModalType } from '@components/layout/custom-modal/enums/modal.enum';

export interface CallbackFn {
    (value: string | boolean): void;
}

@Injectable({
    providedIn: 'root',
})
export class CustomModalService {
    private _modalType = signal<ModalType | null>(null);
    modalType = this._modalType.asReadonly();

    private callback: CallbackFn | null = null;

    /* Alert Modal */
    alertText: string = '';
    confirmText: string = 'OK';

    /* Confirm Modal */
    questionText: string = '';
    confirmButtonText: string = '';
    cancelButtonText: string = '';

    /* Loading Modal */
    loadingText: string = 'Loading...';

    /* Prompt Modal */
    promptText: string = '';
    defaultValue: string = '';
    // also use confirmButtonText
    // also use cancelButtonText

    displayAlertModal(
        callback: CallbackFn,
        alertText: string,
        confirmText: string = 'OK',
    ) {
        this.callback = callback;
        this.alertText = alertText;
        this.confirmText = confirmText;
        this._modalType.set(ModalType.Alert);
    }

    displayConfirmModal(
        callbackFn: CallbackFn,
        questionText: string,
        confirmText: string,
        cancelText: string,
    ) {
        this.callback = callbackFn;
        this.questionText = questionText;
        this.confirmButtonText = confirmText;
        this.cancelButtonText = cancelText;
        this._modalType.set(ModalType.Confirm);
    }

    displayLoadingModal(loadingText: string = 'Loading...') {
        this.loadingText = loadingText;
        this._modalType.set(ModalType.Loading);
    }

    displayPromptModal(
        callbackFn: CallbackFn,
        promptText: string,
        defaultValue: string,
        confirmText: string,
        cancelText: string,
    ) {
        this.callback = callbackFn;
        this.promptText = promptText;
        this.defaultValue = defaultValue;
        this.confirmButtonText = confirmText;
        this.cancelButtonText = cancelText;
        this._modalType.set(ModalType.Prompt);
    }

    closeModal() {
        this._modalType.set(null);
    }
}
