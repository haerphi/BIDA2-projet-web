import { Component, input } from '@angular/core';

@Component({
    selector: 'app-loading-modal',
    imports: [],
    templateUrl: './loading-modal.html',
    styleUrl: './loading-modal.scss',
})
export class LoadingModal {
    loadingText = input<string>('');
}
