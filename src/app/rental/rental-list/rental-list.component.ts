import { Component, OnInit } from '@angular/core';
import { RentalService } from '../services/rental.service';
import { Rental } from '../services/rental.model';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {

  rentals: Rental[] = []

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    // this.rentals = this.rentalService.getRentals();
    const rentalObservable = this.rentalService.getRentals();

    rentalObservable.subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      },
      (err) => {},
      () => {},
    )
  }

}
