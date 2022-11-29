import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersListComponent } from './partners-list/partners-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerComponent } from './partner/partner.component';
import { MatCardModule } from '@angular/material/card';
import { ScorePipe } from 'src/app/pipe/score.pipe';

@NgModule({
  declarations: [
    PartnersListComponent,
    PartnerComponent,
    ScorePipe,
  ],
  imports: [
    CommonModule,
    PartnersRoutingModule,
    MatCardModule,
  ],
  providers: [ScorePipe],
})
export class PartnersModule { }
