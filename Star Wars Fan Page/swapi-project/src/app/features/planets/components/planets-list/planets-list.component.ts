import { Component, OnInit } from '@angular/core';
import { Planet } from '../../interfaces/planets.interface';
import { PlanetsService } from '../../services/planets.service';
import { PlanetsApiService } from '../../services/planets-api.service';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.css'],
})
export class PlanetsListComponent implements OnInit {
  public planetData: Planet[] = [];
  public filteredPlanets: Planet[] = [];
  public pageNumber: number;
  public isFetching: boolean = false;

  constructor(
    private readonly planetsService: PlanetsService,
    private readonly planetsApiService: PlanetsApiService
  ) {}
  ngOnInit(): void {
    this.planetsApiService.pageNumber.subscribe((pageNum) => {
      this.pageNumber = pageNum;
      console.log(this.pageNumber, 'from people list');
    });
    this.fetchPlanetsData();
  }

  fetchPlanetsData() {
    this.planetsService.getPlanets().subscribe((planet) => {
      this.planetData = planet;
      this.filteredPlanets = planet;
      console.log(this.planetData, 'planet data');
    });
    this.planetsService.isFetching.subscribe(
      (isFetching) => (this.isFetching = isFetching)
    );
  }
  nextPage() {
    this.planetsApiService.nextPage();
    this.fetchPlanetsData();
  }
  previousPage() {
    this.planetsApiService.previousPage();
    this.fetchPlanetsData();
  }
  filterPlanets(query: string) {
    if (!query) {
      this.filteredPlanets = this.planetData;
    } else {
      this.filteredPlanets = this.planetData.filter((planet) => {
        return planet.name.toLowerCase().includes(query.toLowerCase());
      });
    }
  }
}
