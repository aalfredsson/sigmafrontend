import { Component, OnInit, Pipe, Injectable, PipeTransform } from '@angular/core';
import { Router }            from '@angular/router';
import { Device }                from './device';
import { DeviceService }         from './device.service';

declare var $: any;

const epochs: any = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
];

@Pipe({name: 'relativeDate'})

@Injectable()
export class UniquePipe2 implements PipeTransform {
   getDuration(timeAgoInSeconds: number) {
        for (let [name, seconds] of epochs) {
            let interval = Math.floor(timeAgoInSeconds / seconds);

            if (interval >= 1) {
                return {
                    interval: interval,
                    epoch: name
                };
            }
        }
        return {
            interval: 0,
            epoch: 'seconds'
        };
    };

    transform(dateStamp: number): string {

        let timeAgoInSeconds = Math.floor((new Date().getTime() - new Date(dateStamp).getTime()) / 1000);
        let {interval, epoch} = this.getDuration(timeAgoInSeconds);
        let suffix = interval === 1 ? '' : 's';

        return `${interval} ${epoch}${suffix} ago`;

    }
    }
 
@Component({
  selector: 'offline-devices',
  templateUrl: './html/offline.component.html'
})

export class OfflineComponent implements OnInit {
  devices: Device[];
  selectedDevice: Device;

  constructor(
    private deviceService: DeviceService,
    private router: Router) { }

  getDevices(): void {
    this.deviceService
        .getDevices()
        .then(devices => this.devices = devices);
  }

  ngOnInit(): void {
    this.getDevices();
    $("#device_filter2").tablesorter();
    $("#device_filter2").bind("DOMSubtreeModified", function(){
        $("#device_filter2").trigger("update"); 
    })
}

  onSelect(device: Device): void {
    this.selectedDevice = device;
  }

  gotoDetail(): void {
    this.router.navigate(['/device', this.selectedDevice.id]);
  }

}