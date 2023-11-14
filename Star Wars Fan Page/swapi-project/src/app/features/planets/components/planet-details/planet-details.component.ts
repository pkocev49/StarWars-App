import { Component, OnInit } from '@angular/core';
import { Planet } from '../../interfaces/planets.interface';
import { PlanetsService } from '../../services/planets.service';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/features/people/interfaces/person.interface';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css'],
})
export class PlanetDetailsComponent implements OnInit {
  planetData: Planet[] = [];
  residentData: Person[] = [];
  errorMessage: string;
  public isFetching: boolean = false;
  planetUrl: string;
  constructor(
    private readonly planetService: PlanetsService,
    private readonly activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.planetUrl = params['planetUrl'];
    });
    this.fetchPlanetData(this.planetUrl);
  }
  fetchPlanetData = (planetUrl: string) => {
    this.planetService.getPlanetsById(planetUrl).subscribe({
      next: (planetData) => {
        if (Array.isArray(planetData)) {
          this.planetData = planetData;
        } else {
          this.planetData = [planetData];
        }
        this.fetchResidents(this.planetData[0]?.residents);
      },

      error: (error) => {
        console.log('Error fetching people details', error);
      },
    });
    this.planetService.isFetching.subscribe(
      (isFetching) => (this.isFetching = isFetching)
    );
  };
  fetchResidents = (residentUrl: []) => {
    console.log('Resident URLs:', residentUrl);

    if (residentUrl.length === 0) {
      console.log('No residents for this planet');
      this.errorMessage = 'No residents for this planet';
    } else {
      this.planetService.getResidents(residentUrl).subscribe({
        next: (residentData) => {
          if (Array.isArray(residentData)) {
            this.residentData = residentData;
          } else {
            this.residentData = [residentData];
          }
          console.log(residentData, 'residentsData');
        },
        error: (error) => {
          if (error.status === 404) {
            this.errorMessage = 'Resident not found';
          } else {
            console.error('Error fetching resident data', error);
          }
        },
      });
    }
  };
}
