import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { PlanetsApiService } from './planets-api.service';
import { Planet } from '../interfaces/planets.interface';
import { Person } from '../../people/interfaces/person.interface';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  isFetching: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private readonly http: HttpClient,
    private readonly planetApiService: PlanetsApiService
  ) {}

  getPlanets(): Observable<Planet[] | []> {
    this.isFetching.next(true);
    return this.planetApiService
      .getPlanets()
      .pipe(finalize(() => this.isFetching.next(false)));
  }
  getPlanetsById = (planetUrl: string): Observable<Planet[]> => {
    this.isFetching.next(true);
    return this.planetApiService
      .getSinglePlanet(planetUrl)
      .pipe(finalize(() => this.isFetching.next(false)));
  };
  getResidents = (residentUrl: []): Observable<Person[]> => {
    this.isFetching.next(true);
    return this.planetApiService
      .getResidents(residentUrl)
      .pipe(finalize(() => this.isFetching.next(false)));
  };
}
