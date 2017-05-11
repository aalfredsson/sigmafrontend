import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Device }        from './device';
import { DeviceService } from './hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class DeviceDetailComponent implements OnInit {
  device: Device;

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.deviceService.getHero(params['id']))
      .subscribe(device => this.device = device);
  }

  goBack(): void {
    this.location.back();
  }
}