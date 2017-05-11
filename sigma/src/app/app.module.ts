import { NgModule, ApplicationRef }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }         from './app.component';

import { DeviceDetailComponent }  from './hero-detail.component';
import { DeviceService }          from './hero.service';

import { OfflineComponent }  from './offline.component';
import { OverviewComponent }  from './overview.component';
import { FilteringComponent, UniquePipe } from './filtering.component';



@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, CommonModule, AppRoutingModule ],
  declarations: [ AppComponent, DeviceDetailComponent, OfflineComponent, OverviewComponent, FilteringComponent, UniquePipe],
  providers: [ DeviceService, UniquePipe ],
  bootstrap:    [ AppComponent, OfflineComponent, OverviewComponent, FilteringComponent ]
})

export class AppModule { }
