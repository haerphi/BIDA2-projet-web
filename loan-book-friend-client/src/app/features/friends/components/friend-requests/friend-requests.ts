import { Component, input, output } from '@angular/core';
import { ReceivedFriendRequestDto, SentFriendRequestDto } from '@core/models';
import { ConfirmationButton } from '@components/commons';

@Component({
    selector: 'app-friend-requests',
    imports: [ConfirmationButton],
    templateUrl: './friend-requests.html',
    styleUrl: './friend-requests.scss',
})
export class FriendRequests {
    requestsSent = input.required<SentFriendRequestDto[]>();
    requestsReceived = input.required<ReceivedFriendRequestDto[]>();

    acceptRequest = output<string>();
    declineRequest = output<string>();

    onAcceptRequest(requestId: string): void {
        this.acceptRequest.emit(requestId);
    }

    onDeclineRequest(requestId: string): void {
        this.declineRequest.emit(requestId);
    }
}
