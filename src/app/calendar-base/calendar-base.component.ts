import { Component } from '@angular/core';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';
import { CalendarModel } from '../models/calendar.model';
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

  constructor() {}

  public setNumberOfDaysToShow(numberOfDaysRecieved: CalendarModel[]): void {
    this.numberOfDaysToShow = numberOfDaysRecieved;
    console.log('this.numberOfDaysToShow :', this.numberOfDaysToShow);
  }
}
