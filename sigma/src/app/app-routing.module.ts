import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DevicesComponent }      from './heroes.component';
import { DeviceDetailComponent }  from './hero-detail.component';

const routes: Routes = [
  { path: 'device/:id', component: DeviceDetailComponent },
  { path: '',     component: DevicesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
