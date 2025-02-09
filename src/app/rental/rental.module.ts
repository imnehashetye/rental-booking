import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { MapModule } from '../common/map/map.module'
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';

import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';

import { RentalService } from './services/rental.service';
import { BookingService } from './services/booking.service';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';

import { UpperCasePipe } from '../common/pipes/pipes';

import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { BookingConfirmModalComponent } from './modals/booking-confirm-modal/booking-confirm-modal.component';

const routes: Routes = [
  { 
    path: 'rentals',
    component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      { path: ':rentalId', component: RentalDetailComponent, canActivate: [AuthGuard] }
    ],
   },
]

@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentalDetailComponent,
    UpperCasePipe,
    RentalDetailBookingComponent,
    BookingConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker,
    FormsModule,
  ],
  entryComponents:[
    BookingConfirmModalComponent,
  ],
  providers: [
    RentalService,
    BookingService,
  ],
})
export class RentalModule {}
