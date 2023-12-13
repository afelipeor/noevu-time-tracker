import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CalendarTypeEnum } from '../enums/calendar-types.enum';
import { CalendarModel } from '../models/calendar.model';
import { CantonModel } from '../models/canton.model';
import { DayToShowModel } from '../models/day-to-show.model';
import { CalendarService } from '../services/calendar.service';

@Component({
    selector: 'app-calendar-day',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './calendar-day.component.html',
    styleUrl: './calendar-day.component.scss',
})
export class CalendarDayComponent implements OnInit {
    @Input() calendarType: string | null = null;
    @Input() calendarDay: CalendarModel | null = null;
    @Input() selectedCanton: CantonModel | null = null;
    @Input() selectedDay: Date | null = null;

    public dayToShow: DayToShowModel | null = null;
    public readonly allCalendarTypes = CalendarTypeEnum;
    public readonly daysOfTheWeekNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    constructor(private calendarService: CalendarService) {}

    ngOnInit(): void {
        if (this.calendarDay) {
            const dateString = this.calendarService.setDateInTimezone(
                `${this.calendarDay.year}-${this.calendarDay.month}-${this.calendarDay.day}`
            );
            const weekDay = new Date(dateString).getDay();

            this.dayToShow = Object.assign(this.calendarDay, {
                day: this.calendarDay?.day,
                month: this.calendarDay?.month,
                year: this.calendarDay?.year,
                dateType: this.calendarDay?.dateType,
                dayOfTheWeek: this.daysOfTheWeekNames[weekDay],
            });
        }
    }
}
