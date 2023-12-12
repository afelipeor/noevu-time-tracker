import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CalendarTypeEnum } from '../enums/calendar-types.enum';
import { CalendarModel } from '../models/calendar.model';
import { CantonModel } from '../models/canton.model';

@Component({
    selector: 'app-calendar-day',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './calendar-day.component.html',
    styleUrl: './calendar-day.component.scss',
})
export class CalendarDayComponent {
    @Input() calendarType: string | null = null;
    @Input() dayToShow: CalendarModel | null = null;
    @Input() selectedCanton: CantonModel | null = null;

    public allCalendarTypes = CalendarTypeEnum;
}
