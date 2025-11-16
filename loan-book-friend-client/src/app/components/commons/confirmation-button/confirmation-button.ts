import { Component, input, output } from '@angular/core';
import { ConfirmModal } from '../modals/confirm-modal/confirm-modal';

@Component({
    selector: 'app-confirmation-button',
    imports: [ConfirmModal],
    templateUrl: './confirmation-button.html',
    styleUrl: './confirmation-button.scss',
})
export class ConfirmationButton {
    buttonText = input<string>('Confirm');

    questionText = input<string>('Are you sure you want to proceed?');
    confirmButtonText = input<string>('Yes'); // not used in this simple implementation
    cancelButtonText = input<string>('No'); // not used in this simple implementation
    confirmed = output<void>();
    cancelled = output<void>();

    disabled = input<boolean>(false);

    displayConfirmation = false;

    onClick(): void {
        this.displayConfirmation = true;
    }

    onConfirmed(): void {
        this.displayConfirmation = false;
        this.confirmed.emit();
    }

    onCancelled(): void {
        this.displayConfirmation = false;
        this.cancelled.emit();
    }
}
