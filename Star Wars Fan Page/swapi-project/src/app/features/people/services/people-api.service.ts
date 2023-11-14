import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HomeWorld, Person } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root',
})
export class PeopleApiService {
  pageNumber: BehaviorSubject<number> = new BehaviorSubject(1);
  constructor(private readonly http: HttpClient) {}

  getPeople = (): Observable<Person[]> => {
    let currentPage = this.pageNumber.value;
    console.log(currentPage, 'currentPage');
    const URL = `https://swapi.dev/api/people/?page=${currentPage}`;

    return this.http.get<Person[]>(URL).pipe(map((res: any) => res.results));
  };

  nextPage() {
    this.pageNumber.next(this.pageNumber.value + 1);
    console.log(this.pageNumber.value, 'next');
  }
  previousPage() {
    this.pageNumber.next(this.pageNumber.value - 1);
    console.log(this.pageNumber.value, 'previous');
  }
  getSinglePerson = (personUrl: string): Observable<Person[]> => {
    return this.http.get<Person[]>(personUrl);
  };
  getHomeWorld = (homeWorldUrl: string): Observable<HomeWorld[]> => {
    return this.http.get<HomeWorld[]>(homeWorldUrl);
  };
}
