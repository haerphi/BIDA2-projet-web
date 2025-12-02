import { Component, input } from '@angular/core';

@Component({
    selector: 'app-spoil',
    imports: [],
    templateUrl: './spoil.html',
    styleUrl: './spoil.scss',
})
export class Spoil {
    buttonText = input.required<string>();
    buttonTextHide = input<string>('❌ Cacher');
    display = false;

    onDisplayBtn() {
        this.display = !this.display;
    }
}
