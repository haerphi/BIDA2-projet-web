import { Component, input } from '@angular/core';
import { SpinnerColorEnum } from './enums';

@Component({
    selector: 'app-spinner',
    imports: [],
    templateUrl: './spinner.html',
    styleUrl: './spinner.scss',
})
export class Spinner {
    color = input<SpinnerColorEnum>(SpinnerColorEnum.Primary);
}
