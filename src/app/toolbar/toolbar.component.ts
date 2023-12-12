import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModel } from '../models/calendar.model';
import { CantonModel } from '../models/canton.model';
import { CalendarService } from '../services/calendar.service';
import { CantonService } from '../services/canton.service';

@Component({
    selector: 'app-toolbar',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
    @Output() numberOfDaysToShow: EventEmitter<CalendarModel[]> =
        new EventEmitter();
    @Output() cantonToShow: EventEmitter<CantonModel | null> =
        new EventEmitter();

    public cantonList: CantonModel[] = [];
    public ammountOfDays: string[] = ['Day', 'Week', 'Month'];
    public daysToShow: string = 'Week';
    public selectedDate: Date = new Date();
    public selectedCanton: CantonModel | null = null;
    private calendar: CalendarModel[] = [];

    constructor(
        private cantonService: CantonService,
        private calendarService: CalendarService
    ) {
        this.getCantons();
    }

    ngOnInit() {
        this.setNumberOfDaysToShow(this.daysToShow);
    }

    public setNumberOfDaysToShow(numberOfDays: string) {
        const month = this.selectedDate.getMonth();
        const year = this.selectedDate.getFullYear();
        this.daysToShow = numberOfDays;
        this.calendar = [];
        if (numberOfDays === 'Day') {
            this.calendar = [new CalendarModel()];
        } else if (numberOfDays === 'Week') {
            const daysInWeek = this.calendarService.getDaysInSelectedWeek(
                this.selectedDate
            );
            daysInWeek.forEach((day) => {
                this.calendar.push(new CalendarModel(Number(day), month, year));
            });
        } else if (numberOfDays === 'Month') {
            const daysInMonth = this.calendarService.getDaysInSelectedMonth(
                this.selectedDate
            );
            for (let day = 1; day < daysInMonth + 1; day++) {
                this.calendar.push(new CalendarModel(day, month, year));
            }
        }
        this.numberOfDaysToShow.emit(this.calendar);
    }

    public emitSelectedCanton(code: CantonModel) {
        this.cantonToShow.emit(code);
    }

    private getCantons(): void {
        this.cantonService.getCantons().subscribe((cantons) => {
            cantons.results.forEach((canton) =>
                this.cantonList.push(new CantonModel(canton))
            );
            this.selectedCanton = this.cantonList[0];
            this.emitSelectedCanton(this.selectedCanton);
        });
    }
}
