import { Component, OnInit, ElementRef } from '@angular/core';
import { Router }            from '@angular/router';


import { Device }                from './device';
import { DeviceService }         from './hero.service';
import { trigger, style, transition, animate, group }
    from '@angular/animations';

@Component({
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ],
   animations: [
  trigger('itemAnim', [
    transition(':enter', [
      style({opacity: '0'}),
        animate(1500)
    ]),
    transition(':leave', [
      group([
        animate('0s ease', style({
          opacity: '0'
        })),
        animate('0s 0s ease', style({
          opacity: 0
        }))
      ])
    ])
  ])
]   
})
export class DevicesComponent implements OnInit {
  devices: Device[];
  selectedDevice: Device;

  constructor(
    private deviceService: DeviceService,
    private router: Router,
        private elementRef:ElementRef
) { }

  getHeroes(): void {
    this.deviceService
        .getHeroes()
        .then(devices => this.devices = devices);
       
  }

  ngOnInit(): void {
    this.getHeroes();
}

 ngAfterViewInit() {
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "js/search.js";
  this.elementRef.nativeElement.appendChild(s);
}

  onSelect(device: Device): void {
    this.selectedDevice = device;
    
  }


  gotoDetail(): void {
    this.router.navigate(['/device', this.selectedDevice.id]);
  }
}