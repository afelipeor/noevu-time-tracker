import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CalendarModel } from '../models/calendar.model';
import { CantonModel } from '../models/canton.model';
import { CantonService } from '../services/canton.service';

@Component({
    selector: 'app-toolbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
    @Output() numberOfDaysToShow: EventEmitter<CalendarModel[]> =
        new EventEmitter();

    public cantonList: CantonModel[] = [];
    public ammountOfDays: string[] = ['Day', 'Week', 'Month'];
    public daysToShow: string = 'Week';
    private calendar: CalendarModel[] = [];

    constructor(private cantonService: CantonService) {
        this.getCantons();
    }

    ngOnInit() {
        this.numberOfDaysToShow.emit(this.calendar);
    }

    private getCantons(): void {
        this.cantonService.getCantons().subscribe((cantons) => {
            cantons.results.forEach((canton) =>
                this.cantonList.push(new CantonModel(canton))
            );
        });
    }
}
