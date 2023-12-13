import { Injectable } from '@angular/core';
import { WeekModel } from '../models/week.model';

@Injectable({
    providedIn: 'root',
})
export class CalendarService {
    /**
     * The function `getDaysInSelectedMonth` returns the number of days in the selected month of a
     * given date.
     * @param {Date} date - The `date` parameter is a JavaScript `Date` object representing the
     * selected month for which you want to determine the number of days.
     * @returns The number of days in the selected month.
     */
    public getDaysInSelectedMonth(date: Date): number {
        const month: number = date.getMonth();
        const year: number = date.getFullYear();
        return new Date(year, month + 1, 0).getDate();
    }
    /**
     * The function `getDaysInSelectedWeek` takes a date as input and returns an array of `WeekModel`
     * objects representing the days of the week surrounding the input date.
     * @param {Date} date - The `date` parameter is a `Date` object representing a specific date.
     * @returns an array of WeekModel objects, which represent the days in the selected week.
     */
    public getDaysInSelectedWeek(date: Date): WeekModel[] {
        const currentDay: number = date.getDay();
        const daysOfWeek = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const daysInWeek = [];

        for (let i = 0; i < 7; i++) {
            const diff = i - currentDay;
            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + diff);
            daysInWeek.push(
                new WeekModel(nextDay, daysOfWeek[nextDay.getDay()])
            );
        }
        return daysInWeek;
    }

    /**
     * The function setDateInTimezone takes a day as input and returns a string representation of that
     * day with a specific timezone offset.
     * @param {string} day - A string representing a specific day in the format "YYYY-MM-DD".
     * @returns a string in the format `T00:00:00-03:00`.
     */
    public setDateInTimezone(day: string): string {
        return `${day}T00:00:00-03:00`;
    }
}
