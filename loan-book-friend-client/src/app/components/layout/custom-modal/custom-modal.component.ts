import {
    AfterViewInit,
    Component,
    computed,
    effect,
    ElementRef,
    inject,
    ViewChild,
} from '@angular/core';
import { ModalType } from '@components/layout/custom-modal/enums/modal.enum';
import { AlertModal } from '@components/layout/custom-modal/components/alert-modal/alert-modal';
import { ConfirmModal } from '@components/layout/custom-modal/components/confirm-modal/confirm-modal';
import { LoadingModal } from '@components/layout/custom-modal/components/loading-modal/loading-modal';
import { PromptModal } from '@components/layout/custom-modal/components/prompt-modal/prompt-modal';
import { CustomModalService } from '@components/layout/custom-modal/services/custom-modal.service';
import { Modal } from 'bootstrap';

@Component({
    selector: 'app-custom-modal',
    imports: [AlertModal, ConfirmModal, LoadingModal, PromptModal],
    templateUrl: './custom-modal.component.html',
    styleUrl: './custom-modal.component.scss',
})
export class CustomModal {
    protected readonly ModalType = ModalType; // used in the template

    private _modalService = inject(CustomModalService);
    modalType = this._modalService.modalType;

    isOpen = computed(() => this._modalService.modalType() !== null);

    close() {
        this._modalService.closeModal();
    }
}
