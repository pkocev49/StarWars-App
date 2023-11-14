import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipCardComponent } from './components/ship-card/ship-card.component';
import { ShipDetailsComponent } from './components/ship-details/ship-details.component';
import { ShipsListComponent } from './components/ships-list/ships-list.component';
import { ShipsRoutingModule } from './ships-routing.module';

@NgModule({
  declarations: [ShipCardComponent, ShipDetailsComponent, ShipsListComponent],
  imports: [CommonModule, ShipsRoutingModule],
})
export class ShipsModule {}
