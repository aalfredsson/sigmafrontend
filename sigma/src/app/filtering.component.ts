import { Component, enableProdMode, OnInit, Pipe, PipeTransform, Injectable  } from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser'
import { Router }        from '@angular/router';

import { Device }        from './device';
import { DeviceService } from './hero.service';


declare var $: any;
declare var _: any;

@Pipe({
    name: 'uniqFilter',
    pure: false
})
@Injectable()
export class UniquePipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        // filter items array, items which match and return true will be kept, false will be filtered out

        return _.uniqBy(items, args);
    }
}

@Component({
    selector: 'filter-devices',
    template: `
  <div class="location-box">
  
    <select id="device_location_list" (change)="onChange()">
        <option value="all" selected>Visa alla rum</option>
      <ng-container  *ngFor="let device of devices | uniqFilter:'device.locationName'">
        <option value="{{device.locationName}}">{{device.locationName}}</option>
      </ng-container>
    </select>

    <select id="device_status_list" (change)="onStatusChange()">
        <option value="all" selected>Offline/Online</option>
        <option value="false">Online</option>
        <option value="true">Offline</option>
    </select>


    <table id="device_filter" class="tablesorter" style="width: 100%;">
      <thead>
        <tr>
          <th class="header">Name</th>
          <th class="header">Time Offline</th>
          <th class="header">Online</th>
        </tr>
      </thead>
      <tbody>
        <ng-container *ngFor="let device of devices" >
          <tr class="device_row" *ngIf="filter_devices(device)" (click)="onSelect(device)" (click)="gotoDetail()">
            <td>{{ device.name }}</td>
            <td>{{ device.contactLostTime }}</td> 
            <td>{{ check_offline(device) }}</td>
          </tr>
        </ng-container>
      </tbody>
    </table>
  </div>
 `,
    
})

export class FilteringComponent implements OnInit { 
  devices: Device[];
  selectedDevice: Device;
  selectedRoom: string;
  selectedStatus: boolean;

  constructor(
    private deviceService: DeviceService,
    private router: Router) {

  }
  
  ngOnInit() {
      this.getHeroes();

      $("#device_filter").tablesorter();
      $("#device_filter").bind("DOMSubtreeModified", function(){
          $("#device_filter").trigger("update"); 
      })
      this.onStatusChange();
  }

  getHeroes(): void {
    this.deviceService
        .getHeroes()
        .then(devices => this.devices = devices);
  }

  onStatusChange(): void {
    var mySelect: any = document.getElementById("device_status_list");
    var selectedStatus: string = mySelect.options[mySelect.selectedIndex].value;

    if (selectedStatus == "true") {
        this.selectedStatus = true;
    }
    else if (selectedStatus == "false") {
        this.selectedStatus = false;
    }
    else if (selectedStatus == "all"){
      this.selectedStatus = null;
    }
  }

  check_offline(device: any){
    //just a function to show if the device is offline or online, should be changed so when false/true the css would
    //change the color
    if(device.contactLost == false){
      return "Online";
    }
    else if (device.contactLost == true){
      return "Offline";
    }
  }

  onSelect(device: Device): void {
      this.selectedDevice = device;
  }

  gotoDetail(): void {
    this.router.navigate(['/device', this.selectedDevice.id]);
  }

  onChange(): void {
    var mySelect: any = document.getElementById("device_location_list");
    var selectedRoom: string = mySelect.options[mySelect.selectedIndex].value;
    this.selectedRoom = selectedRoom;
  }

  filter_devices(device: any){
    if(this.selectedStatus == undefined && device.locationName == this.selectedRoom){
      return true;
    }
    else if(this.selectedRoom == "all" && this.selectedStatus == undefined){
      return true;
    }
    else if(this.selectedRoom == undefined && this.selectedStatus === null){
      return true;
    }

    if(this.selectedRoom == undefined && this.selectedStatus == device.contactLost){
      return true;
    }
    else if(this.selectedRoom == "all" && this.selectedStatus == device.contactLost){
      return true;
    }

    if (device.locationName == this.selectedRoom && this.selectedStatus == device.contactLost){
      return true;
    }
    else if(this.selectedRoom == "all" && this.selectedStatus === null ){
      return true;
    }

  }

}