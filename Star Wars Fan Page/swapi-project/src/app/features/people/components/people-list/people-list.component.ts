import { ChangeDetectorRef, Component } from '@angular/core';
import { Person } from '../../interfaces/person.interface';
import { PeopleService } from '../../services/people.service';
import { PeopleApiService } from '../../services/people-api.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css'],
})
export class PeopleListComponent {
  public peopleData: Person[] = [];
  public filteredPeople: Person[] = [];
  public pageNumber: number;
  public isFetching: boolean = false;
  constructor(
    private readonly peopleService: PeopleService,
    private readonly peopleApiService: PeopleApiService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  fetchPeopleData() {
    this.peopleService.getPeople().subscribe((person) => {
      this.peopleData = person;
      this.filteredPeople = person;
    });
    this.peopleService.isFetching.subscribe(
      (isFetching) => (this.isFetching = isFetching)
    );
  }
  ngOnInit() {
    this.peopleApiService.pageNumber.subscribe((pageNum) => {
      this.pageNumber = pageNum;
      console.log(this.pageNumber, 'from people list');
    });
    this.fetchPeopleData();
  }
  nextPage() {
    this.peopleApiService.nextPage();
    console.log('Next Page Clicked. New Page Number:', this.pageNumber);
    this.fetchPeopleData();
    this.cdr.detectChanges();
  }
  previousPage() {
    this.peopleApiService.previousPage();
    this.fetchPeopleData();
  }
  filterPeople(query: string) {
    if (!query) {
      this.filteredPeople = this.peopleData;
    } else {
      this.filteredPeople = this.peopleData.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase());
      });
    }
  }
}
