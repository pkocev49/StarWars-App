import { Component, OnInit } from '@angular/core';
import { Ships } from '../../interfaces/ships.interface.module';
import { ShipsService } from '../../services/ships.service';
import { ShipsApiService } from '../../services/ships-api.service';

@Component({
  selector: 'app-ships-list',
  templateUrl: './ships-list.component.html',
  styleUrls: ['./ships-list.component.css'],
})
export class ShipsListComponent implements OnInit {
  public shipsData: Ships[] = [];
  public filteredShips: Ships[] = [];
  public pageNumber: number;
  public isFetching: boolean = false;

  constructor(
    private readonly shipsService: ShipsService,
    private readonly ShipsApiService: ShipsApiService
  ) {}

  fetchShipsData() {
    this.shipsService.getShips().subscribe((ship) => {
      this.shipsData = ship;
      this.filteredShips = ship;
      console.log(this.shipsData, 'shipsData');
    });
    this.shipsService.isFetching.subscribe(
      (isFetching) => (this.isFetching = isFetching)
    );
  }
  ngOnInit(): void {
    this.ShipsApiService.pageNumber.subscribe((pageNum) => {
      this.pageNumber = pageNum;
      console.log(this.pageNumber, 'from people list');
    });
    this.fetchShipsData();
  }
  nextPage() {
    this.ShipsApiService.nextPage();
    this.fetchShipsData();
  }
  previousPage() {
    this.ShipsApiService.previousPage();
    this.fetchShipsData();
  }
  filterShips(query: string) {
    if (!query) {
      this.filteredShips = this.shipsData;
    } else {
      this.filteredShips = this.shipsData.filter((ship) => {
        return ship.name.toLowerCase().includes(query.toLowerCase());
      });
    }
  }
}
