import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WindowRef } from '../../rental/services/windowRef';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MapService {
    private geoCoder;

    constructor(private winRef: WindowRef, private http: HttpClient) {}

  public geocodeLocation(location: string): Observable<any> {
    this.geoCoder = new this.winRef.nativeWindow.google.maps.Geocoder();
    return new Observable((observer) => {
        this.geoCoder.geocode({ address: location }, (result, status) => {
            if (status === 'OK') {
                const geometry = result[0].geometry.location;
                observer.next({lat: geometry.lat(), lng: geometry.lng()});
            } else {
                observer.error('Location could not be geocoded');
            }
        })
    });
  }
}