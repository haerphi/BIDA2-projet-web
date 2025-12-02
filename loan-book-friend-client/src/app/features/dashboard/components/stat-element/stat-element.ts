import { Component, input } from '@angular/core';
import { TextBgStyleEnum } from '@core/constants/styles/text-bg.style-enum';

@Component({
    selector: 'app-stat-element',
    imports: [],
    templateUrl: './stat-element.html',
    styleUrl: './stat-element.scss',
})
export class StatElement {
    title = input.required<string>();
    badgeText = input<string>();
    badgeColor = input<TextBgStyleEnum>(TextBgStyleEnum.Primary);
    stat = input.required<number>();
    loading = input<boolean>(false);
}
