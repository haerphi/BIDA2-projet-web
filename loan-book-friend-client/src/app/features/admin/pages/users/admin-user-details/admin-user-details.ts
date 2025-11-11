import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingModal } from '@components/commons/modals/loading-modal/loading-modal';
import { UserDetailsPage } from '@features/users/pages/user-details-page/user-details-page';

@Component({
    selector: 'app-admin-user-details',
    imports: [LoadingModal, UserDetailsPage],
    templateUrl: './admin-user-details.html',
    styleUrl: './admin-user-details.scss',
})
export class AdminUserDetails implements OnInit {
    private readonly _activatedRoute = inject(ActivatedRoute);

    userId: string | null = null;

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params) => {
            this.userId = params.get('id');
        });
    }
}
