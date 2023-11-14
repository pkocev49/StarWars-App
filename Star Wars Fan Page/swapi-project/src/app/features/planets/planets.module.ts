import { NgModule } from '@angular/core';
import { PlanetCardComponent } from './components/planet-card/planet-card.component';
import { PlanetDetailsComponent } from './components/planet-details/planet-details.component';
import { PlanetsListComponent } from './components/planets-list/planets-list.component';
import { CommonModule } from '@angular/common';
import { PlanetsRoutingModule } from './planets-routing.module';

@NgModule({
  declarations: [
    PlanetCardComponent,
    PlanetDetailsComponent,
    PlanetsListComponent,
  ],
  imports: [CommonModule, PlanetsRoutingModule],
})
export class PlanetsModule {}
