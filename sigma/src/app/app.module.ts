import { NgModule, enableProdMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }         from './app.component';
import { DevicesComponent }      from './devices.component';
import { DeviceDetailComponent }  from './device-detail.component';
import { DeviceService }          from './device.service';
import { OfflineComponent }          from './offline.component';
import { FilteringComponent }          from './filtering.component';
import { UniquePipe }          from './filtering.component';
import { UniquePipe2 }          from './offline.component';
import { OverviewComponent }          from './overview.component';

enableProdMode();

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    DeviceDetailComponent,
    DevicesComponent,
    OfflineComponent,
    FilteringComponent,
    OverviewComponent,
    UniquePipe,
    UniquePipe2
          ],
  providers: [ DeviceService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}