import { Component, AfterViewInit } from '@angular/core';

declare var $: any;


export class Device {
    id: number;
    name: string;
    location: string;
    status: boolean;
}



let DEVICES = {
  
	"devices": [{
			"id": 1,
			"name": "Device 1",
			"location": "rum21",
            "status": false,
            "signalStrength": -90,
            "battery": 65,
            "lastSeen": "15 min"
		},
		{
			"id": 2,
			"name": "Device 2",
			"location": "rum22",
            "status": false,
            "signalStrength": -62,
            "battery": 0,
            "lastSeen": "10 min"
		},
		{
			"id": 3,
			"name": "Device 3",
			"location": "rum23",
            "status": true,
            "signalStrength": -53,
            "battery": 5,
            "lastSeen": "1 min"
        },
        {
            "id": 4,
            "name": "Device 4",
            "location": "rum23",
            "status": false,
            "signalStrength": -54,
            "battery": 0,
            "lastSeen": "10 min"
        },
        {
            "id": 5,
            "name": "Device 5",
            "location": "rum23",
            "status": false,
            "signalStrength": -80,
            "battery": 83,
            "lastSeen": "1 min"
        }
    ]

}

@Component({
    selector: 'offline-devices',
    template: `

    <ng-container *ngFor="let device of devices.devices">
        <div class="list-item" *ngIf="check_offline(device)" (click)="onSelect(device)">
            <a class="demo01" href="#animatedModal">{{all_offline_devices(device)}}</a>
        </div>
    </ng-container>  
`,
    
})

export class OfflineComponent implements AfterViewInit  { 

  name = 'Angular'; 
  devices = DEVICES;
  selectedDevice: Device;

  onSelect(device: Device): void {
      this.selectedDevice = device;
  }

  ngAfterViewInit(): void {
      $("#animatedModal").show();
      $(".demo01").animatedModal();
  }

  check_offline(device: any){
    if (device.status == false){
      return true;
    }
  }

  all_offline_devices(device: any){
      if(device.status == false){
        return device.name;
      }
    }
    
     devicesID(device: any){
        return device.id;
    }


    devices_online(devices: any) {
        var count: number = 0;
        for (let device of devices.devices) {
            if (device.status == true) {
                count = count + 1;
            }
        }
        var online_percent: number = (count / devices.devices.length) * 100;
        return Math.round(online_percent);
  }

    devices_offline(devices: any) {
        var count: number = 0;
        for (let device of devices.devices) {
            if (device.status == false) {
                count = count + 1;
            }
        }
        var online_percent: number = (count / devices.devices.length) * 100;
        return Math.round(online_percent);
    }

    warning_devices(devices: any) {
        var count: number = 0;
        for (let device of devices.devices) {
            if ((device.battery < 20) && (device.battery > 0)) {
                count = count + 1;
            }
        }
        var online_percent: number = (count / devices.devices.length) * 100;
        return Math.round(online_percent);
    }


  check_location(device: any){
    //skapa ny lista för varje location och sätt location som header ovanför respektive lista
    if(device["location"] == "rum22"){
      return true;
    }
    
  }

  no_duplicates(device: any){
    var mySelect: any = document.getElementById("device_location_list");
    var mySelectLength: number = mySelect.length - 1;
    console.log(mySelect);
    if(mySelect.length != 0){
      for(var i = 0; i < mySelect.length; i++){
        if (mySelect.options[mySelectLength].value != device.location){
          return true;
        }
      }
    }
    else{
      return true;
    }
  }

}