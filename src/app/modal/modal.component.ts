import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
})
export class ModalComponent {
    @Input() title: string = '';
    @Output() showModal: EventEmitter<boolean> = new EventEmitter();

    /**
     * The function closeModal emits a boolean value of false through the showModal event.
     */
    public closeModal(): void {
        this.showModal.emit(false);
    }
}
