import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersListComponent } from './partners-list/partners-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerComponent } from './partner/partner.component';

@NgModule({
  declarations: [
    PartnersListComponent,
    PartnerComponent,
  ],
  imports: [
    CommonModule,
    PartnersRoutingModule,
  ]
})
export class PartnersModule { }
