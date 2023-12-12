import { Injectable } from '@angular/core';
import { WeekModel } from '../models/week.model';

@Injectable({
    providedIn: 'root',
})
export class CalendarService {
    public getDaysInSelectedMonth(date: Date): number {
        const month: number = date.getMonth();
        const year: number = date.getFullYear();
        return new Date(year, month + 1, 0).getDate();
    }
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
}
