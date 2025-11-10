import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-confirm-modal',
    imports: [],
    templateUrl: './confirm-modal.html',
    styleUrl: './confirm-modal.scss',
})
export class ConfirmModal {
    questionText = input<string>('Are you sure?');
    confirmButtonText = input<string>('Confirm');
    cancelButtonText = input<string>('Cancel');
    cancelOnBackdrop = input<boolean>(true);

    confirmed = output<void>();
    cancelled = output<void>();

    onConfirm() {
        this.confirmed.emit();
    }

    onCancel() {
        this.cancelled.emit();
    }

    onBackdropClick() {
        if (this.cancelOnBackdrop()) {
            this.onCancel();
        }
    }
}
