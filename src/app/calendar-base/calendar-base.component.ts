import { Component } from '@angular/core';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';
import { CalendarModel } from '../models/calendar.model';
import { CantonModel } from '../models/canton.model';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
    selector: 'app-calendar-base',
    standalone: true,
    imports: [ToolbarComponent, CalendarDayComponent],
    templateUrl: './calendar-base.component.html',
    styleUrl: './calendar-base.component.scss',
})
export class CalendarBaseComponent {
    public numberOfDaysToShow: CalendarModel[] = [];
    public selectedCanton: CantonModel | null = null;

    constructor() {}

    /**
     * The function sets the number of days to show in a calendar.
     * @param {CalendarModel[]} numberOfDaysRecieved - The parameter `numberOfDaysRecieved` is an array
     * of `CalendarModel` objects.
     */
    public setNumberOfDaysToShow(numberOfDaysRecieved: CalendarModel[]): void {
        this.numberOfDaysToShow = numberOfDaysRecieved;
    }

    /**
     * The function sets the selected canton to the provided canton object.
     * @param {CantonModel} canton - The parameter "canton" is of type "CantonModel".
     */
    public setSelectedCanton(canton: CantonModel | null): void {
        this.selectedCanton = canton;
    }
}
