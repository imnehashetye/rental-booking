import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RentalService {

  constructor(private http: HttpClient) {}
    // private rentals: Rental[] = [{
    //     id: 1,
    //     title: 'Central Apartment',
    //     city: 'Mumbai',
    //     street: 'Times Square',
    //     category: 'apartment',
    //     image: 'http://via.placeholder.com/350x250',
    //     bedrooms: 3,
    //     description: 'Very Nice Apartment',
    //     daily: 34,
    //     shared: false,
    //     createdAt: '24/12/2017'
    //   }, {
    //     id: 1,
    //     title: 'Central Apartment',
    //     city: 'New York',
    //     street: 'Times Sqquare',
    //     category: 'apartment',
    //     image: 'http://via.placeholder.com/350x250',
    //     bedrooms: 3,
    //     description: 'Very Nice Apartment',
    //     daily: 34,
    //     shared: false,
    //     createdAt: '24/12/2017'
    //   }, {
    //     id: 1,
    //     title: 'Central Apartment',
    //     city: 'Paris',
    //     street: 'Times Sqquare',
    //     category: 'apartment',
    //     image: 'http://via.placeholder.com/350x250',
    //     bedrooms: 3,
    //     description: 'Very Nice Apartment',
    //     daily: 34,
    //     shared: false,
    //     createdAt: '24/12/2017'
    //   }, {
    //     id: 1,
    //     title: 'Central Apartment',
    //     city: 'Denmark',
    //     street: 'Times Sqquare',
    //     category: 'apartment',
    //     image: 'http://via.placeholder.com/350x250',
    //     bedrooms: 3,
    //     description: 'Very Nice Apartment',
    //     daily: 34,
    //     shared: false,
    //     createdAt: '24/12/2017'
    //   }, {
    //     id: 1,
    //     title: 'Central Apartment',
    //     city: 'London',
    //     street: 'Times Sqquare',
    //     category: 'apartment',
    //     image: 'http://via.placeholder.com/350x250',
    //     bedrooms: 3,
    //     description: 'Very Nice Apartment',
    //     daily: 34,
    //     shared: false,
    //     createdAt: '24/12/2017'
    //   }];

      public getrentalById(rentalId): Observable<any> {
        return this.http.get('/api/v1/rentals/' + rentalId);
        // return new Observable<Rental>((observer) => {
        //   const rentalData = this.rentals.find(x => (x.id === +rentalId));
        //   observer.next(rentalData);
        // })
      }

      public getRentals(): Observable<any> {
        console.log('tttttttttttt')
        return this.http.get('/api/v1/rentals');
          // return new Observable<Rental[]>((observer) => {
          //   setTimeout(() => {
          //     observer.next(this.rentals);
          //   }, 1000);
          // });
      }
}