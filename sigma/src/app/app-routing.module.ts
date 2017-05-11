import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilteringComponent }  from './filtering.component';
import { DeviceDetailComponent }  from './hero-detail.component';

const routes: Routes = [
  { path: 'device/:id', component: DeviceDetailComponent },
  { path: '',     component: FilteringComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}