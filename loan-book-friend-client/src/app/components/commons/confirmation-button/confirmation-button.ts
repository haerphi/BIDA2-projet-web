import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-confirmation-button',
    imports: [],
    templateUrl: './confirmation-button.html',
    styleUrl: './confirmation-button.scss',
})
export class ConfirmationButton {
    buttonText = input<string>('Confirm');

    questionText = input<string>('Are you sure you want to proceed?');
    confirmButtonText = input<string>('Yes'); // not used in this simple implementation
    cancelButtonText = input<string>('No'); // not used in this simple implementation
    confirmed = output<void>();

    onClick(): void {
        this.confirmed.emit();
    }
}
