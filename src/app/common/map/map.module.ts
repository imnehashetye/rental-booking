
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { MapComponent } from './map.component';
import { MapService } from './map.service';
import { WindowRef } from '../../rental/services/windowRef';

@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyBiDWYhsC4ziGkcAhj-U_0HYEQJqdmV1L0',
        libraries: ['places']
        })
  ],
  providers: [
    MapService,
    WindowRef,
  ],
})
export class MapModule { }
