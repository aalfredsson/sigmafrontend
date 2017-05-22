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
  templateUrl: './filter.component.html',
  styleUrls: [ './heroes.component.css' ]
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
      this.onStatusChange("Offline/Online");
  }


  getHeroes(): void {
    this.deviceService
        .getHeroes()
        .then(devices => this.devices = devices);
  }

  onStatusChange(selectedStatus: string): void {
    console.log(selectedStatus);
    if (selectedStatus == "Offline") {
        this.selectedStatus = true;
        $('#dropdownMenu2').html('Offline <span class="caret"></span>');
    }
    else if (selectedStatus == "Online") {
        this.selectedStatus = false;
        $('#dropdownMenu2').html('Online <span class="caret"></span>');
    }
    else if (selectedStatus == "Offline/Online"){
      $('#dropdownMenu2').html('Offline/Online <span class="caret"></span>');
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

  onChange(selectedRoom: string): void {
    this.selectedRoom = selectedRoom;
    $('#dropdownMenu1').html(this.selectedRoom + ' <span class="caret"></span>');
  }

  device_by_room(device: any){
    if(this.selectedStatus == undefined && device.locationName == this.selectedRoom){
      return true;
    }
    else if(this.selectedRoom == "Show all rooms" && this.selectedStatus == undefined){
      return true;
    }
    else if(this.selectedRoom == undefined && this.selectedStatus === null){
      return true;
    }

    if(this.selectedRoom == undefined && this.selectedStatus == device.contactLost){
      return true;
    }
    else if(this.selectedRoom == "Show all rooms" && this.selectedStatus == device.contactLost){
      return true;
    }

    if (device.locationName == this.selectedRoom && this.selectedStatus == device.contactLost){
      return true;
    }
    else if(this.selectedRoom == "Show all rooms" && this.selectedStatus === null ){
      return true;
    }

  }

}