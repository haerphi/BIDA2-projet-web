import { Component, effect, input, output, signal } from '@angular/core';
import { FriendGetListDto, FriendGetListQueryDto } from '@core/models';
import { FormsModule } from '@angular/forms';
import { debounceSignal } from '@core/utils/signal.utils';

@Component({
    selector: 'app-friend-list',
    imports: [FormsModule],
    templateUrl: './friend-list.html',
    styleUrl: './friend-list.scss',
})
export class FriendList {
    friends = input.required<FriendGetListDto[]>();
    loading = input<boolean>(false);

    filterFriends = output<FriendGetListQueryDto>();

    searchNameInput = signal<string>('');
    searchNameDebounced = debounceSignal(this.searchNameInput, 400, '');

    constructor() {
        effect(() => {
            const filters: FriendGetListQueryDto = {};

            if (this.searchNameDebounced()) {
                filters.name = this.searchNameDebounced();
            }

            this.onSearchChange(filters);
        });
    }

    onSearchChange(filters: FriendGetListQueryDto): void {
        const validFilters: FriendGetListQueryDto = {};

        if (filters.name && filters.name.trim()) {
            validFilters.name = filters.name.trim();
        }

        this.filterFriends.emit(validFilters);
    }

    onResetFilers(): void {
        this.searchNameInput.set('');

        this.filterFriends.emit({});
    }
}
