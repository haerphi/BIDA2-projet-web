import { Component, inject, input, output } from '@angular/core';
import { CustomModalService } from '@components/layout/custom-modal/services/custom-modal.service';

@Component({
    selector: 'app-confirmation-button',
    imports: [],
    templateUrl: './confirmation-button.html',
    styleUrl: './confirmation-button.scss',
})
export class ConfirmationButton {
    private readonly _modalService = inject(CustomModalService);

    buttonText = input<string>('Confirm');

    questionText = input<string>('Are you sure you want to proceed?');
    confirmButtonText = input<string>('Yes'); // not used in this simple implementation
    cancelButtonText = input<string>('No'); // not used in this simple implementation
    confirmed = output<void>();

    onClick(): void {
        // const confirmation = window.confirm(this.questionText());
        // if (confirmation) {
        //     this.confirmed.emit();
        // }
        this._modalService.displayConfirmModal(
            () => {
                this.confirmed.emit();
            },
            this.questionText(),
            this.confirmButtonText(),
            this.cancelButtonText(),
        );
    }
}
