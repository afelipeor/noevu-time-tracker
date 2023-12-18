import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { daysOfTheWeekNames } from '../constants/days-of-the-week-names.const';

@Component({
    selector: 'app-set-workdays-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './set-workdays-modal.component.html',
    styleUrl: './set-workdays-modal.component.scss',
})
export class SetWorkdaysModalComponent {
    @Input() workdays: boolean[] = [];
    @Output() showModal: EventEmitter<boolean> = new EventEmitter();
    @Output() activeWorkdays: EventEmitter<boolean[]> = new EventEmitter();
    public readonly daysOfTheWeekNames = daysOfTheWeekNames;

    /**
     * The function closeModal emits a boolean value of false through the showModal event.
     */
    public closeModal(): void {
        this.showModal.emit(false);
    }

    /**
     * The function sets the active workdays and emits them to a listener, then closes a modal.
     */
    public setWorkdays(): void {
        this.activeWorkdays.emit(this.workdays);
        this.closeModal();
    }
}
