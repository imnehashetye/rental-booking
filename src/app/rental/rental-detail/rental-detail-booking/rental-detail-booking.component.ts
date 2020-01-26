import { Component, OnInit, Input, NgModuleRef } from '@angular/core';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { Rental } from '../../services/rental.model';
import { Booking } from '../../services/booking.model';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { BookingConfirmModalComponent } from '../../modals/booking-confirm-modal/booking-confirm-modal.component';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental: Rental;

  public daterange: any = {
    start: moment().format('YYYY-MM-DD'),
    end: moment().add(1, 'days').format('YYYY-MM-DD')
  };
  public bookedOutDates: any = [];
  newBooking: Booking;
  errors: any = '';
  modalRef:any;

  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions:NgbModalOptions;
 
  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
      locale: { format: 'YYYY-MM-DD' },
      alwaysShowCalendars: false,
      autoUpdateInput: false,
      isInvalidDate: this.checkForInvalidDates.bind(this),
  };

  constructor(private modalService: NgbModal, private BookingService: BookingService, private toastr: ToastrService) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop',
    }
  }
   

  ngOnInit() {
    this.newBooking = new Booking();
    
console.log('this.newBookingtttttttttttt', this.newBooking)
    if (this.rental.bookings.length) this.getBookedDates();
  }

  private checkForInvalidDates(date) {
    return this.bookedOutDates.includes(date.format('YYYY-MM-DD')) || (date.diff(moment(), 'days') < 0);
  }

  public createBooking() {
    Object.assign(this.newBooking, { rental: this.rental });
    this.BookingService.createBooking(this.newBooking).subscribe(
      (bookingData) => {
        console.log('bookingDatatttttttttt', bookingData)
        this.toastr.success('', 'Rental booked successfully');
        window.location.reload();
      },
      (err) => {
        this.errors = err.error.msg;
        this.toastr.error('', this.errors);
      }
    )
  }

  public reserveBooking() {
    this.newBooking.daily = this.rental.daily;
    this.newBooking.totalPrice = this.newBooking.days * this.rental.daily;
    this.modalRef = this.modalService.open(BookingConfirmModalComponent);
    this.modalRef.componentInstance.bookingDetails = this.newBooking;
    this.modalRef.result.then((result) => {
      console.log('tttttttttttttt', result)
      if (result) this.createBooking();
    }, (reason) => {
      console.log('reason', reason)
      // this.modalRef.close();
    })
  }

  public getBookedDates() {
    const bookings = this.rental.bookings;
    const tempDates = [];

   for(let i: number = 0; i < bookings.length; i += 1) {
     const data: any = bookings[i];
      let sDate = moment(data.start_date);
      const eDate = moment(data.end_date);

      while(sDate < eDate) {
        tempDates.push(sDate.format('YYYY-MM-DD'));
        sDate = sDate.add(1,'day');
      }

      tempDates.push(sDate.format('YYYY-MM-DD'));
      tempDates.push(eDate.format('YYYY-MM-DD'));
    }

    this.bookedOutDates = tempDates;
  }

  public selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
      this.newBooking.startDate = value.start.format('YYYY-MM-DD');
      this.newBooking.endDate = value.end.format('YYYY-MM-DD');
      this.newBooking.days = -value.start.diff(value.end, 'days');

      // or manupulat your own internal property
      this.daterange.start = value.start;
      this.daterange.end = value.end;
      this.daterange.label = value.label;
  }

}
