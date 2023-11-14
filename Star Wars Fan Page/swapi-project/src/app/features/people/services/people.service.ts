import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  finalize,
  map,
} from 'rxjs';
import { HomeWorld, Person } from '../interfaces/person.interface';
import { PeopleApiService } from './people-api.service';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  isFetching: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private readonly http: HttpClient,
    private readonly peopleApiService: PeopleApiService
  ) {}

  getPeople(): Observable<Person[] | []> {
    this.isFetching.next(true);
    return this.peopleApiService
      .getPeople()
      .pipe(finalize(() => this.isFetching.next(false)));
  }
  getPeopleById = (personUrl: string): Observable<Person[]> => {
    this.isFetching.next(true);
    return this.peopleApiService
      .getSinglePerson(personUrl)
      .pipe(finalize(() => this.isFetching.next(false)));
  };
  getHomeWorld = (homeWorldUrl: string): Observable<HomeWorld[]> => {
    this.isFetching.next(true);
    return this.peopleApiService
      .getHomeWorld(homeWorldUrl)
      .pipe(finalize(() => this.isFetching.next(false)));
  };
}
