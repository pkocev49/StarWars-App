import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { ShipsApiService } from './ships-api.service';
import { Ships } from '../interfaces/ships.interface.module';

@Injectable({
  providedIn: 'root',
})
export class ShipsService {
  isFetching: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private readonly http: HttpClient,
    private readonly shipsApiService: ShipsApiService
  ) {}

  getShips(): Observable<Ships[] | []> {
    this.isFetching.next(true);
    return this.shipsApiService
      .getShips()
      .pipe(finalize(() => this.isFetching.next(false)));
  }
  getShipsById = (shipsUrl: string): Observable<Ships[]> => {
    this.isFetching.next(true);
    return this.shipsApiService
      .getSingleShip(shipsUrl)
      .pipe(finalize(() => this.isFetching.next(false)));
  };
}
