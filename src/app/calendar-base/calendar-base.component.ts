import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { take } from 'rxjs';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';
import { daysOfTheWeekNames } from '../constants/days-of-the-week-names.const';
import { CalendarTypeEnum } from '../enums/calendar-types.enum';
import { DateTypeEnum } from '../enums/date-types.enum';
import { CalendarModel } from '../models/calendar.model';
import { CantonModel } from '../models/canton.model';
import { DateTypeModel } from '../models/date-type.model';
import { HolidayModel } from '../models/holliday.model';
import { CalendarService } from '../services/calendar.service';
import { HolidaysService } from '../services/holiday.service';
import { SetWorkdaysModalComponent } from '../set-workdays-modal/set-workdays-modal.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
    selector: 'app-calendar-base',
    standalone: true,
    imports: [
        ToolbarComponent,
        CalendarDayComponent,
        CommonModule,
        SetWorkdaysModalComponent,
    ],
    templateUrl: './calendar-base.component.html',
    styleUrl: './calendar-base.component.scss',
})
export class CalendarBaseComponent {
    public selectedDays: CalendarModel[] = [];
    public monthsInYear: CalendarModel[][] = [];
    public selectedDay: Date | null = null;
    public selectedCanton: CantonModel | null = null;
    public calendarType: string | null = null;
    public allDateTypes = DateTypeEnum;
    public openSelectWorkdaysModal: boolean = false;
    public activeWorkdays: boolean[] = [
        false,
        true,
        true,
        true,
        true,
        true,
        false,
    ];
    public readonly monthNames: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    public readonly daysOfTheWeekNames = daysOfTheWeekNames;
    public allCalendarTypes = CalendarTypeEnum;

    constructor(
        private holidaysService: HolidaysService,
        private calendarService: CalendarService
    ) {}

    /**
     * The function sets the selected days in a calendar model and then retrieves the holidays for
     * those days.
     * @param {CalendarModel[]} numberOfDaysRecieved - An array of CalendarModel objects representing
     * the selected days.
     */
    public setSelectedDays(numberOfDaysRecieved: CalendarModel[]): void {
        this.selectedDays = numberOfDaysRecieved;
        this.getHolidays();
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

    /**
     * The function sets the selected day to a new Date object and then calls the getHolidays function.
     * @param {string} day - The parameter "day" is a string representing a specific day.
     */
    public setSelectedDay(day: string): void {
        this.selectedDay = new Date(
            this.calendarService.setDateInTimezone(day)
        );
        this.getHolidays();
    }

    /**
     * The function `setDaysToShow` takes a `CalendarModel` object and returns the name of the day of
     * the week for the given date.
     * @param {CalendarModel} day - The "day" parameter is an object of type "CalendarModel" which
     * represents a specific day in a calendar. It contains the following properties:
     * @returns the name of the day of the week for the given date.
     */
    public setDaysToShow(day: CalendarModel): string {
        const dateString = this.calendarService.formatDateString(
            day.day,
            day.month,
            day.year
        );
        const weekDay = new Date(dateString).getDay();
        return this.daysOfTheWeekNames[weekDay];
    }

    /**
     * The getWeekDay function returns the day of the week for the selected day.
     * @returns The method is returning the day of the week as a number. If there is a selected day, it
     * returns the day of the week for that selected day. Otherwise, it returns 0.
     */
    public getWeekDay(): number {
        return this.selectedDay ? this.selectedDay.getDay() : 0;
    }

    /**
     * The function `setActiveWorkdays` sets the active workdays based on the provided boolean array
     * and updates the workdays accordingly.
     * @param {boolean[]} activeWorkdays - An array of booleans representing the active workdays. Each
     * element in the array corresponds to a day of the week, starting from Sunday (index 0) to
     * Saturday (index 6). If the value is true, it means that the corresponding day is an active
     * workday.
     */
    public setActiveWorkdays(activeWorkdays: boolean[]) {
        this.activeWorkdays = activeWorkdays;
        this.setWorkdays(activeWorkdays);
    }

    /**
     * The function `getHolidays()` retrieves holidays for a selected day and maps them to a specific
     * model.
     */
    private getHolidays() {
        if (this.selectedDay) {
            this.holidaysService
                .getHolidaysForDate(this.selectedDay)
                .pipe(take(1))
                .subscribe((holidays) => {
                    this.mapHolidays(holidays as HolidayModel[]);
                });
        }
    }

    /**
     * The function `mapHolidays` takes in a list of holiday models and maps them to the selected days
     * based on the calendar type.
     * @param {HolidayModel[]} holidays - An array of HolidayModel objects.
     */
    private mapHolidays(holidays: HolidayModel[]): void {
        let holidaysList: HolidayModel[] = [];

        if (this.calendarType === this.allCalendarTypes.day) {
            holidaysList = this.getHolidaysForDay(holidays);
        } else if (this.calendarType === this.allCalendarTypes.month) {
            holidaysList = this.getHolidaysForMonth(holidays);
        } else if (this.calendarType === this.allCalendarTypes.week) {
            holidaysList = this.getHolidaysForWeek(holidays);
        } else if (this.calendarType === this.allCalendarTypes.year) {
            this.monthsInYear = [];
            let holidaysForYear: HolidayModel[] = [];

            for (let month in this.monthNames) {
                const holidaysForMonth: HolidayModel[] =
                    this.getHolidaysForYear(Number(month) + 1, holidays);
                holidaysForYear = holidaysForYear.concat(holidaysForMonth);
            }
            holidaysList = holidaysForYear;
            this.breakDaysIntoMonths();
        }

        for (let day of this.selectedDays) {
            this.matchHolidayToDate(day, holidaysList);
        }
        this.setWorkdays(this.activeWorkdays);
    }

    /**
     * The function `getHolidaysForDay` takes an array of holiday objects and returns an array
     * containing the holiday object for the selected day, if it exists.
     * @param {HolidayModel[]} holidayList - An array of objects representing holidays. Each object should
     * have a "date" property representing the date of the holiday.
     * @returns an array of HolidayModel objects. If a holiday is found for the selected day, it will
     * return an array containing that holiday. Otherwise, it will return an empty array.
     */
    private getHolidaysForDay(holidayList: HolidayModel[]): HolidayModel[] {
        const holiday = holidayList.find(
            (date) =>
                this.selectedDay?.toDateString() ===
                new Date(
                    this.calendarService.setDateInTimezone(date.date)
                ).toDateString()
        );
        return holiday ? [holiday] : [];
    }

    /**
     * The function `getHolidaysForWeek` takes a list of holidays and returns only the holidays that
     * fall within the selected days of the week.
     * @param {HolidayModel[]} holidayList - An array of HolidayModel objects, which represents a list
     * of holidays.
     * @returns an array of HolidayModel objects that fall within the selected week.
     */
    private getHolidaysForWeek(holidayList: HolidayModel[]): HolidayModel[] {
        const holidaysInMonth = this.getHolidaysForMonth(holidayList);
        const holidaysInWeek: HolidayModel[] = [];
        const daysInWeek: number[] = [];

        this.selectedDays.forEach((day) => daysInWeek.push(day.day));

        for (const holiday of holidaysInMonth) {
            const holidayDay = new Date(
                this.calendarService.setDateInTimezone(holiday.date)
            ).getDate();

            if (daysInWeek.includes(holidayDay)) {
                holidaysInWeek.push(holiday);
            }
        }
        return holidaysInWeek;
    }

    /**
     * The function `getHolidaysForMonth` filters a list of holidays based on the month of a selected
     * day.
     * @param {HolidayModel[]} holidayList - An array of holiday objects, where each object has a
     * "date" property representing the date of the holiday.
     * @returns an array of HolidayModel objects that correspond to the selected month.
     */
    private getHolidaysForMonth(holidayList: HolidayModel[]): HolidayModel[] {
        const holidayMonth = holidayList.filter(
            (date) =>
                new Date(
                    this.calendarService.setDateInTimezone(date.date)
                ).getMonth() +
                    1 ===
                (this.selectedDay ? this.selectedDay?.getMonth() + 1 : false)
        );
        return holidayMonth;
    }
    private getHolidaysForYear(
        month: number,
        holidayList: HolidayModel[]
    ): HolidayModel[] {
        const holidayMonth = holidayList.filter(
            (date) =>
                new Date(
                    this.calendarService.setDateInTimezone(date.date)
                ).getMonth() +
                    1 ===
                month
        );
        return holidayMonth;
    }

    /**
     * The function `matchHolidayToDate` checks if a given day matches any holiday in a list and sets
     * the `dateType` property of the day accordingly.
     * @param {CalendarModel} day - The "day" parameter is an instance of the CalendarModel class,
     * which represents a specific day in a calendar. It contains properties such as year, month, day,
     * and dateType.
     * @param {HolidayModel[]} holidayList - An array of objects representing holidays. Each object
     * should have a "date" property representing the date of the holiday.
     */
    private matchHolidayToDate(
        day: CalendarModel,
        holidayList: HolidayModel[]
    ) {
        for (let holiday of holidayList) {
            const holidayDate = new Date(
                this.calendarService.setDateInTimezone(holiday.date)
            );
            if (
                day.year === holidayDate.getFullYear() &&
                day.month === holidayDate.getMonth() + 1 &&
                day.day === holidayDate.getDate()
            ) {
                day.dateType = new DateTypeModel(
                    this.allDateTypes.Holiday,
                    holiday
                );
            }
        }

        this.setDaysToShow(day);
    }

    /**
     * The function "breakDaysIntoMonths" takes an array of selected days and breaks them into separate
     * arrays for each month of the year.
     */
    private breakDaysIntoMonths() {
        for (let monthIndex = 1; monthIndex <= 12; monthIndex++) {
            const daysInMonth: CalendarModel[] = [];

            for (let day of this.selectedDays) {
                if (day.month === monthIndex) {
                    daysInMonth.push(day);
                }
            }
            const currentDay: number = daysInMonth[0].day;
            const currentYear: number = daysInMonth[0].year;
            this.calendarService
                .getDaysInPreviousMonth(currentDay, monthIndex, currentYear)
                .reverse()
                .forEach((day) => daysInMonth.unshift(day));
            this.monthsInYear.push(daysInMonth);
        }
    }

    /**
     * The function sets the date type of selected days based on whether they are active workdays or
     * not.
     * @param {boolean[]} activeWorkdays - An array of boolean values representing whether each day of
     * the week is an active workday or not. The array should have a length of 7, where the index 0
     * represents Sunday, index 1 represents Monday, and so on.
     */
    private setWorkdays(activeWorkdays: boolean[]) {
        for (let day of this.selectedDays) {
            if (day.dateType.dateType !== this.allDateTypes.Holiday) {
                const dayAsDate: Date = new Date(
                    this.calendarService.formatDateString(
                        day.day,
                        day.month,
                        day.year
                    )
                );
                if (activeWorkdays[dayAsDate.getDay()]) {
                    day.dateType.dateType = this.allDateTypes.Work;
                } else {
                    day.dateType.dateType = this.allDateTypes.Pto;
                }
            }
        }
    }
}
