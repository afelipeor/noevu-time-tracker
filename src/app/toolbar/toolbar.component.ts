import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CalendarModel } from '../models/calendar.model';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  @Output() numberOfDaysToShow: EventEmitter<CalendarModel[]> =
    new EventEmitter();
  private calendar: CalendarModel[] = [
    new CalendarModel(),
    new CalendarModel(),
    new CalendarModel(),
    new CalendarModel(),
  ];

  ngOnInit() {
    this.numberOfDaysToShow.emit(this.calendar);
  }
}
