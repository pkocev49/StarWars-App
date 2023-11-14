import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { HomeWorld, Person } from '../../interfaces/person.interface';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.css'],
})
export class PeopleDetailsComponent implements OnInit {
  personData: Person[] = [];
  homeWorldData: HomeWorld[] = [];
  public isFetching: boolean = false;
  personUrl: string;
  constructor(
    private readonly peopleService: PeopleService,
    private readonly activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.personUrl = params['personUrl'];
    });

    this.fetchPeopleDetails(this.personUrl);
    console.log(this.personData[0]?.homeworld, 'homeworld url');
  }
  fetchPeopleDetails = (personUrl: string) => {
    this.peopleService.getPeopleById(personUrl).subscribe({
      next: (peopleData) => {
        if (Array.isArray(peopleData)) {
          this.personData = peopleData;
        } else {
          this.personData = [peopleData];
        }
        console.log(peopleData);
        console.log(this.personData[0]?.homeworld, 'homeworld url');
        this.fetchHomeWorld(this.personData[0].homeworld);
      },

      error: (error) => {
        console.log('Error fetching people details', error);
      },
    });
    this.peopleService.isFetching.subscribe(
      (isFetching) => (this.isFetching = isFetching)
    );
  };
  fetchHomeWorld = (personUrl: string) => {
    this.peopleService.getHomeWorld(personUrl).subscribe({
      next: (homeworldData) => {
        if (Array.isArray(homeworldData)) {
          this.homeWorldData = homeworldData;
        } else {
          this.homeWorldData = [homeworldData];
        }
        console.log(homeworldData, 'home world data');
      },
      error: (error) => {
        console.error('Error fetching homeworld data', error);
      },
    });
  };
}
