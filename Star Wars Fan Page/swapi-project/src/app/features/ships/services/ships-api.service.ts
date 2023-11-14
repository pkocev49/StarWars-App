import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Ships } from '../interfaces/ships.interface.module';
// import { Person } from '../../people/interfaces/person.interface';

@Injectable({
  providedIn: 'root',
})
export class ShipsApiService {
  pageNumber: BehaviorSubject<number> = new BehaviorSubject(1);
  constructor(private readonly http: HttpClient) {}

  getShips = (): Observable<Ships[]> => {
    let currentPage = this.pageNumber.value;
    console.log(currentPage, 'currentPage');
    const URL = `https://swapi.dev/api/starships/?page=${currentPage}`;

    return this.http.get<Ships[]>(URL).pipe(map((res: any) => res.results));
  };
  nextPage() {
    this.pageNumber.next(this.pageNumber.value + 1);
    console.log(this.pageNumber.value, 'next');
    // console.log(this.currentPage, 'currentPage next');
  }
  previousPage() {
    this.pageNumber.next(this.pageNumber.value - 1);
    console.log(this.pageNumber.value, 'previous');
    // console.log(this.currentPage, 'currentPage previous');
  }
  getSingleShip = (shipsUrl: string): Observable<Ships[]> => {
    return this.http.get<Ships[]>(shipsUrl);
  };
}
