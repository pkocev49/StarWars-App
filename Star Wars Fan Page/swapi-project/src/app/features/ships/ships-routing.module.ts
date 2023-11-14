import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipsListComponent } from './components/ships-list/ships-list.component';
import { ShipDetailsComponent } from './components/ship-details/ship-details.component';

const routes: Routes = [
  { path: '', component: ShipsListComponent },
  { path: ':shipsUrl', component: ShipDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipsRoutingModule {}
