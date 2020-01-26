import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-confirm-modal',
  templateUrl: './booking-confirm-modal.component.html',
  styleUrls: ['./booking-confirm-modal.component.scss']
})
export class BookingConfirmModalComponent implements OnInit {

  @Input() bookingDetails;
  @Input() errors;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log('ttttttt', this.bookingDetails)
    console.log('eeeeeeeeeeeeeeeeeeeeee', this.errors)

  }

}
