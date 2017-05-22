import { Component, OnInit } from '@angular/core';
import { Router }        from '@angular/router';


import { Device }        from './device';
import { DeviceService } from './hero.service';


@Component({
    selector: 'overview-devices',
    templateUrl: `./overview.component.html`,
    styles: [`
    .list-item {
      padding: 10px;
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 25px;
      margin-bottom: 10px;
      width: 25%;
      display: flex;
    }
    
    .spawn {
      margin-left: auto;
    }
    
    .location-box {
      padding: 10px;
      border: solid 1px rgba(0,0,0,0.2);
    }
    `]
})

export class OverviewComponent implements OnInit  { 
    devices: Device[];


    constructor(
        private deviceService: DeviceService,
        private router: Router) {

    }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes(): void {
        this.deviceService
            .getHeroes()
            .then(devices => this.devices = devices);
    }

    devices_offline(devices: any) {

        var count: number = 0;
        for (let device of devices) {
            if (device.contactLost == true) {
                count = count + 1;
            }
        }
        var online_percent: number = (count / devices.length) * 100;
        return Math.round(online_percent);
  }

    devices_online(devices:any) {
        var count: number = 0;
        for (let device of devices) {
            if (device.contactLost == false) {
                count = count + 1;
            }
        }
        var online_percent: number = (count / devices.length) * 100;
        return Math.round(online_percent);
    }

    warning_devices(devices: any) {
        var count: number = 0;
        for (let device of devices.devices) {
            if ((device.battery < 20) && (device.battery > 0)) {
                count = count + 1;
            }
            else if ((device.signalStrength < -70) && (device.signalStrength > -90)) {
                count = count + 1;
            }
        }
        var online_percent: number = (count / devices.devices.length) * 100;
        return Math.round(online_percent);
    }

}