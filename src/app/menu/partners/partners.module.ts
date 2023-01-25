import { PipeModule } from './../../pipe/pipe/pipe.module';
import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersListComponent } from './partners-list/partners-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerComponent } from './partner/partner.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PartnersListComponent,
    PartnerComponent,
  ],
  imports: [
    CommonModule,
    PartnersRoutingModule,
    MatCardModule,
    HttpClientModule,
    PipeModule,
  ],
})
export class PartnersModule { }
