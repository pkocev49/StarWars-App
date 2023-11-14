import { Component, OnInit } from '@angular/core';
import { Ships } from '../../interfaces/ships.interface.module';
import { ShipsService } from '../../services/ships.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ship-details',
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.css'],
})
export class ShipDetailsComponent implements OnInit {
  shipsData: Ships[] = [];
  shipsUrl: string;
  public isFetching: boolean = false;

  constructor(
    private readonly shipsService: ShipsService,
    private readonly activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.shipsUrl = params['shipsUrl'];
    });
    this.fetchShipsDetails(this.shipsUrl);
  }

  fetchShipsDetails = (shipsUrl: string) => {
    this.shipsService.getShipsById(shipsUrl).subscribe({
      next: (shipsData) => {
        if (Array.isArray(shipsData)) {
          this.shipsData = shipsData;
        } else {
          this.shipsData = [shipsData];
        }
        console.log(shipsData);
      },

      error: (error) => {
        console.log('Error fetching people details', error);
      },
    });
    this.shipsService.isFetching.subscribe(
      (isFetching) => (this.isFetching = isFetching)
    );
  };
}
