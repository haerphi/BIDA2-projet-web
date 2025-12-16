import {
    Component,
    ElementRef,
    forwardRef,
    signal,
    computed,
    input,
    inject,
    output,
    HostListener,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { InputSelectAutocompleteOption } from './models/input-select-auto-complete-option.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { NgClass } from '@angular/common';

type OnChangeFn = (value: string) => void;
type OnTouchedFn = () => void;

@Component({
    selector: 'app-input-select-autocomplete',
    templateUrl: './input-select-autocomplete.html',
    styleUrl: './input-select-autocomplete.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputSelectAutocomplete),
            multi: true,
        },
    ],
    imports: [NgClass],
})
export class InputSelectAutocomplete
    implements ControlValueAccessor, OnInit, OnDestroy
{
    /** Inputs */
    options = input.required<InputSelectAutocompleteOption[]>();
    placeholder = input<string>('Rechercher...');
    debounce = input<number>(300);

    /** Outputs */
    inputChanged = output<string>();

    /** Internal state */
    private readonly el = inject(ElementRef);
    private readonly destroy$ = new Subject<void>();
    private readonly inputStream$ = new Subject<string>();

    value = signal('');
    disabled = signal(false);
    isOpen = signal(false);

    onChange!: OnChangeFn;
    onTouched!: OnTouchedFn;

    /** Search on label only */
    filteredOptions = computed(() => {
        const search = this.value().toLowerCase();
        return this.options().filter((opt) =>
            opt.label.toLowerCase().includes(search),
        );
    });

    // -------------------------------------
    // RxJS DEBOUNCE INITIALIZATION
    // -------------------------------------
    ngOnInit(): void {
        this.inputStream$
            .pipe(debounceTime(this.debounce()), takeUntil(this.destroy$))
            .subscribe((searchText) => {
                this.inputChanged.emit(searchText);
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    // -------------------------------------
    // ControlValueAccessor – value → label
    // -------------------------------------
    writeValue(rawValue: string | null): void {
        if (!rawValue) {
            this.value.set('');
            return;
        }

        const option = this.options().find((o) => o.value === rawValue);
        this.value.set(option ? option.label : '');
    }

    registerOnChange(fn: OnChangeFn): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: OnTouchedFn): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    // -------------------------------------
    // TYPING → debounce → output
    // -------------------------------------
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleInput(event: any): void {
        const typedLabel = event.target.value;

        this.value.set(typedLabel);
        this.isOpen.set(true);

        // Push text into the debounced stream
        this.inputStream$.next(typedLabel);
    }

    // -------------------------------------
    // OPTION SELECTION → emit VALUE to form
    // -------------------------------------
    selectOption(option: InputSelectAutocompleteOption): void {
        if (option.disabled) {
            return;
        }
        this.value.set(option.label);

        this.onChange(option.value);
        this.onTouched();

        this.isOpen.set(false);
    }

    // -------------------------------------
    // CLICK OUTSIDE
    // -------------------------------------
    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event): void {
        if (!this.el.nativeElement.contains(event.target)) {
            this.isOpen.set(false);
            this.onTouched?.();
        }
    }
}
