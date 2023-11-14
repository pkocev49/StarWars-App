import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import { Planet } from '../interfaces/planets.interface';
import { Person } from '../../people/interfaces/person.interface';

@Injectable({
  providedIn: 'root',
})
export class PlanetsApiService {
  pageNumber: BehaviorSubject<number> = new BehaviorSubject(1);
  constructor(private readonly http: HttpClient) {}

  getPlanets = (): Observable<Planet[]> => {
    let currentPage = this.pageNumber.value;
    const URL = `https://swapi.dev/api/planets/?page=${currentPage}`;
    return this.http.get<Planet[]>(URL).pipe(map((res: any) => res.results));
  };
  nextPage() {
    this.pageNumber.next(this.pageNumber.value + 1);
    console.log(this.pageNumber.value, 'next');
  }
  previousPage() {
    this.pageNumber.next(this.pageNumber.value - 1);
    console.log(this.pageNumber.value, 'previous');
  }
  getSinglePlanet = (planetUrl: string): Observable<Planet[]> => {
    return this.http.get<Planet[]>(planetUrl);
  };
  getResidents = (residentUrl: []): Observable<Person[]> => {
    const requests = residentUrl.map((url) => this.http.get<Person>(url));
    return forkJoin(requests);
  };
}
