import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PeopleCardComponent } from './components/people-card/people-card.component';
import { PeopleDetailsComponent } from './components/people-details/people-details.component';
import { CoreModule } from 'src/app/core/core.module';
import { PeopleRoutingModule } from './people-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    PeopleListComponent,
    PeopleCardComponent,
    PeopleDetailsComponent,
  ],
  imports: [CommonModule, PeopleRoutingModule],
})
export class PeopleModule {}
