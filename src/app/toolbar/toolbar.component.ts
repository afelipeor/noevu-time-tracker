import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarTypeEnum } from '../enums/calendar-types.enum';
import { CalendarTypesType } from '../models/calendar-types.type';
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
    @Output() calendarType: EventEmitter<string> = new EventEmitter();

    public cantonList: CantonModel[] = [];
    public calendarEnum: CalendarTypesType = CalendarTypeEnum;
    public ammountOfDays: string[] = Object.values(CalendarTypeEnum);
    public daysToShow: string = this.calendarEnum.week;
    public selectedDate: string = new Date().toLocaleDateString('en-US');
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

    /**
     * The function sets the number of days to show in a calendar and generates the corresponding
     * calendar model based on the selected date and calendar type.
     * @param {CalendarTypeEnum} numberOfDays - The `numberOfDays` parameter is of type
     * `CalendarTypeEnum`, which is an enumeration representing different types of calendar views.
     */
    public setNumberOfDaysToShow(numberOfDays: string) {
        const date = new Date(this.selectedDate);
        const month = date.getMonth();
        const year = date.getFullYear();

        console.log('this.daysToShow:', this.daysToShow);
        console.log('numberOfDays:', numberOfDays);
        this.daysToShow = numberOfDays;
        this.calendar = [];
        this.calendarType.emit(numberOfDays);

        if (numberOfDays === CalendarTypeEnum.day) {
            this.calendar = [new CalendarModel(date.getDate(), month, year)];
        } else if (numberOfDays === CalendarTypeEnum.week) {
            const daysInWeek = this.calendarService.getDaysInSelectedWeek(date);
            daysInWeek.forEach((day) => {
                this.calendar.push(
                    new CalendarModel(day.date.getDate(), month, year)
                );
            });
        } else if (numberOfDays === CalendarTypeEnum.month) {
            const daysInMonth =
                this.calendarService.getDaysInSelectedMonth(date);
            for (let day = 1; day < daysInMonth + 1; day++) {
                this.calendar.push(new CalendarModel(day, month, year));
            }
        }
        this.numberOfDaysToShow.emit(this.calendar);
    }

    /**
     * The function emits the selected Canton code.
     * @param {CantonModel} code - The code parameter is of type CantonModel.
     */
    public emitSelectedCanton(code: CantonModel) {
        this.cantonToShow.emit(code);
    }

    /**
     * The function updates the selected date and sets the number of days to show.
     * @param {string} date - The `date` parameter is a string that represents a specific date.
     */
    public updateDates(date: string) {
        this.selectedDate = date;
        this.setNumberOfDaysToShow(this.daysToShow);
    }

    /**
     * The getCantons function retrieves a list of cantons from a service, creates CantonModel objects
     * for each canton, assigns the first canton as the selected canton, and emits the selected canton.
     */
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
