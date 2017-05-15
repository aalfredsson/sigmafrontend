import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Device }                from './device';
import { DeviceService }         from './hero.service';
@Component({
    selector: 'search-devices',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
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
    onChange(): void {
        console.log("hej");
    }
    gotoDetail(): void {
        this.router.navigate(['/device', this.selectedDevice.id]);
    }
}