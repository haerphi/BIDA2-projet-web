import { Component, input, output } from '@angular/core';
import { FriendGetListDto, FriendGetListQueryDto } from '@core/models';
import { FormsModule } from '@angular/forms';

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

    searchNameInput = '';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blurInput(event: any): void {
        console.log(event.currentTarget.blur());
    }

    onSearchChange(): void {
        const filters: FriendGetListQueryDto = {};

        if (this.searchNameInput.trim()) {
            filters.name = this.searchNameInput.trim();
        }

        this.filterFriends.emit(filters);
    }

    onResetFilers(): void {
        this.searchNameInput = '';

        this.filterFriends.emit({});
    }
}
