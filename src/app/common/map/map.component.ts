import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() location: string;

  lat: number = 51.678418;
  lng: number = 7.809007;

  // 37.2077253,
  // -95.40219549999999

  constructor(private MapService: MapService) { }

  ngOnInit() {}

  mapReadyHandler() {
    this.MapService.geocodeLocation(this.location)
    .subscribe((coordinates) => {
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;
    })
  }
}
