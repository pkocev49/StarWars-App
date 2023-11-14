import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetsListComponent } from './components/planets-list/planets-list.component';
import { PlanetDetailsComponent } from './components/planet-details/planet-details.component';
const routes: Routes = [
  { path: '', component: PlanetsListComponent },
  { path: ':planetUrl', component: PlanetDetailsComponent },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanetsRoutingModule {}
