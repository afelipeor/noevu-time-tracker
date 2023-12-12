import { DateTypeEnum } from '../enums/date-types.enum';

export class CalendarModel {
  day: number;
  month: number;
  year: number;
  dateType: DateTypeEnum;

  constructor(
    day: number = new Date().getDay(),
    month: number = new Date().getMonth(),
    year: number = new Date().getFullYear(),
    dateType: DateTypeEnum = DateTypeEnum.Work
  ) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.dateType = dateType;
  }
}
