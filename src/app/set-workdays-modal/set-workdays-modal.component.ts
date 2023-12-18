import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { daysOfTheWeekNames } from '../constants/days-of-the-week-names.const';

@Component({
    selector: 'app-set-workdays-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './set-workdays-modal.component.html',
    styleUrl: './set-workdays-modal.component.scss',
})
export class SetWorkdaysModalComponent {
    @Output() showModal: EventEmitter<boolean> = new EventEmitter();
    public readonly daysOfTheWeekNames = daysOfTheWeekNames;

    /**
     * The function closeModal emits a boolean value of false through the showModal event.
     */
    public closeModal(): void {
        this.showModal.emit(false);
    }
}
