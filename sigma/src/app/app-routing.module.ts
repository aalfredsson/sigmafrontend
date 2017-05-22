import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DevicesComponent }      from './heroes.component';
import { DeviceDetailComponent }  from './hero-detail.component';
import { AllDevicesComponent }  from './all-devices.component';


const routes: Routes = [
  { path: 'device/:id', component: DeviceDetailComponent },
  { path: 'devices',     component: AllDevicesComponent },
  { path: '',     component: DevicesComponent },
  { path: '**',     component: DevicesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
