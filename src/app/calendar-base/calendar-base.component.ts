import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';
import { CalendarTypesType } from '../models/calendar-types.type';
import { CalendarModel } from '../models/calendar.model';
import { CantonModel } from '../models/canton.model';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
    selector: 'app-calendar-base',
    standalone: true,
    imports: [ToolbarComponent, CalendarDayComponent, CommonModule],
    templateUrl: './calendar-base.component.html',
    styleUrl: './calendar-base.component.scss',
})
export class CalendarBaseComponent {
    public selectedDays: CalendarModel[] = [];
    public selectedCanton: CantonModel | null = null;
    public calendarType: string | null = null;

    constructor() {}

    /**
     * The function sets the selected days in a calendar model.
     * @param {CalendarModel[]} numberOfDaysRecieved - The parameter `numberOfDaysRecieved` is an array
     * of `CalendarModel` objects.
     */
    public setSelectedDays(numberOfDaysRecieved: CalendarModel[]): void {
        this.selectedDays = numberOfDaysRecieved;
    }

    /**
     * The function sets the calendar type.
     * @param {string} calendarType - The parameter `calendarType` is a string that represents the type
     * of calendar.
     */
    public setCalendarType(calendarType: string): void {
        this.calendarType = calendarType;
    }

    /**
     * The function sets the selected canton to the provided canton or null.
     * @param {CantonModel | null} canton - The `canton` parameter is of type `CantonModel` or `null`.
     */
    public setSelectedCanton(canton: CantonModel | null): void {
        this.selectedCanton = canton;
    }
}
