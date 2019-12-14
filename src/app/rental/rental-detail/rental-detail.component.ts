import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../services/rental.service';
import { Rental } from '../services/rental.model';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {

  id: number;
  rental: Rental;
  constructor(private route: ActivatedRoute, private rentalService: RentalService) { }

  ngOnInit() {
    // as its observable object
    this.route.params.subscribe(
      (params) => {
        this.id = params.rentalId;
        this.getRentalData(this.id);
      })
  }

  getRentalData(id) {
    console.log('id', id)
    this.rentalService.getrentalById(id).subscribe(
      (rental: Rental) => {
        this.rental = rental;
      })
  }

}
