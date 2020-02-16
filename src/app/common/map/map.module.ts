
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
        apiKey: 'KEY',
        libraries: ['places']
        })
  ],
  providers: [
    MapService,
    WindowRef,
  ],
})
export class MapModule { }
