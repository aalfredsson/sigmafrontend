import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router }        from '@angular/router';

import { Device }        from './device';
import { DeviceService } from './hero.service';

@Component({
    selector: 'overview-devices',
    template:`
            <div class="panel-body">
                <h4 class="onlineOffline">Online Devices</h4>
                <progressbar class="onlineOffline" [animate]="true" [value]="onlineValue" [type]="onlineType">
                    <b>{{onlineValue}}%</b>
                </progressbar>
                <br>
                <h4 class="onlineOffline">Offline Devices</h4>
                <progressbar class="onlineOffline" [animate]="true" [value]="offlineValue" [type]="offlineType">
                    <b>{{offlineValue}}%</b>
                </progressbar>
            </div>
             `,

})
export class OverviewComponent implements OnInit, AfterContentChecked {

    public offlineValue:number;
    public onlineValue:number;
    public offlineType:string;
    public onlineType:string;
    public devices: Device[];

    constructor(private deviceService: DeviceService,
        private router: Router) {
    }

    ngOnInit() {
        this.getHeroes();
    }

    ngAfterContentChecked(){
        if(this.devices != undefined){
            this.devices_offline(this.devices);
            this.devices_online(this.devices);
        }
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
        this.offlineValue = Math.round(online_percent);
        this.offlineType = 'danger';
  }

    devices_online(devices:any) {
        var count: number = 0;
        for (let device of devices) {
            if (device.contactLost == false) {
                count = count + 1;
            }
        }
        var online_percent: number = (count / devices.length) * 100;
        this.onlineValue = Math.round(online_percent);
        this.onlineType = 'success';
    }
}