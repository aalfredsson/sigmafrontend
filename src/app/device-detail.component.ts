import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ElementRef }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Device }        from './device';
import { DeviceService } from './device.service';
import { trigger, style, transition, animate, group } from '@angular/animations';

@Component({
  selector: 'device-detail',
  templateUrl: './html/device-detail.component.html',
   animations: [
  trigger('itemAnim', [
    transition(':enter', [
      style({opacity: '0'}),
        animate(300)
    ]),
    transition(':leave', [
      group([
        animate('0.2s ease', style({
          opacity: '1'
        })),
        animate('0.5s 0.2s ease', style({
          opacity: 0
        }))
      ])
    ])
  ])
]   
})

export class DeviceDetailComponent implements OnInit {
  device: Device;

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private location: Location,
    private elementRef:ElementRef,
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.deviceService.getDevice(params['id']))
      .subscribe(device => this.device = device);
  }

  ngAfterViewInit() {
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "assets/js/bar-chart.js";
  this.elementRef.nativeElement.appendChild(s);
}

  goBack(): void {
    this.location.back();
  }

}
