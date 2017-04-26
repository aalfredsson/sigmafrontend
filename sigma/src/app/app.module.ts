import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { OfflineComponent }  from './offline.component';
import { OverviewComponent }  from './overview.component';
import { FilteringComponent }  from './filtering.component';


@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ OfflineComponent, OverviewComponent, FilteringComponent ],
  bootstrap:    [ OfflineComponent, OverviewComponent, FilteringComponent ]
})

export class AppModule { }
