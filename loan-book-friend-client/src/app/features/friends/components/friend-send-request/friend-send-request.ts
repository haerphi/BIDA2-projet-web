import { Component, inject, output } from '@angular/core';
import { FriendFormFactoryService } from '@features/friends/services/friend-form-factory.service';
import { SendFriendRequestFormDto } from '@core/models';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-friend-send-request',
    imports: [ReactiveFormsModule],
    templateUrl: './friend-send-request.html',
    styleUrl: './friend-send-request.scss',
})
export class FriendSendRequest {
    private readonly _fff = inject(FriendFormFactoryService);

    useEmail = true;

    form = this._fff.sendFriendRequestForm();
    controls = this.form.controls;

    sendFriendRequest = output<SendFriendRequestFormDto>();

    onUseEmail() {
        this.useEmail = !this.useEmail;
        this.form.reset();
    }

    onSubmit() {
        if (this.form.valid) {
            console.log(this.form.value);
            this.sendFriendRequest.emit(
                this.form.value as SendFriendRequestFormDto,
            );
        }
    }
}
