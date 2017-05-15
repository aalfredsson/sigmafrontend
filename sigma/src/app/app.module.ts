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
import { UniquePipe }          from './filtering.component';
import { UniquePipe2 }          from './offline.component';
import { SearchComponent }          from './search-component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { OverviewComponent }          from './overview.component';



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
    UniquePipe2,
    SearchComponent
  ],
  providers: [ DeviceService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
