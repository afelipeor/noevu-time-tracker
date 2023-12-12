import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { CantonApiModel } from '../models/canton-api.model';
import { CantonModel } from '../models/canton.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CantonService {
  // URL for the api to get the Cantons from opendatasoft.com with pre-generated queries.
  private readonly apiUrl: string =
    'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-switzerland-kanton/records?limit=26&select=kan_code%2C%20kan_name';

  constructor(private http: HttpClient) {}

  public getCantons(): Observable<{
    total_count: number;
    results: CantonApiModel[];
  }> {
    return this.http.get<{ total_count: number; results: CantonApiModel[] }>(
      this.apiUrl
    );
  }
}
