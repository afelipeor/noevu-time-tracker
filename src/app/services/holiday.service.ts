import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HolidaysService {
    private apiUrl: string =
        'https://api.api-ninjas.com/v1/holidays?country=CH&year=';

    constructor(private http: HttpClient) {}

    public getHolidaysForDate(date: Date) {
        return this.http.get(this.apiUrl + date.getFullYear());
    }
}
