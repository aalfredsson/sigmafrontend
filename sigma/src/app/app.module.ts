import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }         from './app.component';
import { DevicesComponent }      from './heroes.component';
import { DeviceDetailComponent }  from './hero-detail.component';
import { DeviceService }          from './hero.service';
import { OfflineComponent }          from './offline.component';
import { FilteringComponent }          from './filtering.component';
import { OverviewComponent }          from './overview.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    DeviceDetailComponent,
    DevicesComponent,
    OfflineComponent,
    FilteringComponent,
    OverviewComponent
  ],
  providers: [ DeviceService ],
  bootstrap: [ AppComponent, OfflineComponent, FilteringComponent, OverviewComponent ]
})
export class AppModule { }
