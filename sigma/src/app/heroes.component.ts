import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Device }                from './device';
import { DeviceService }         from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]
})
export class DevicesComponent implements OnInit {
  devices: Device[];
  selectedDevice: Device;

  constructor(
    private deviceService: DeviceService,
    private router: Router) { }

  getHeroes(): void {
    this.deviceService
        .getHeroes()
        .then(devices => this.devices = devices);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(device: Device): void {
    this.selectedDevice = device;
  }

  gotoDetail(): void {
    this.router.navigate(['/device', this.selectedDevice.id]);
  }
}
