import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BookingService {

  constructor(private http: HttpClient) {}

      public createBooking(booking): Observable<any> {
        return this.http.post('/api/v1/booking/', booking);
      }
}