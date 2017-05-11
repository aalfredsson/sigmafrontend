import { Component } from '@angular/core';

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
            "status": true,
            "signalStrength": -90,
            "battery": 65,
            "lastSeen": "15 min"
		},
		{
			"id": 2,
			"name": "Device 2",
			"location": "rum22",
            "status": true,
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
    selector: 'overview-devices',
    template: `
    
    
     <div class="panel-body">
                            <div class="panel_positive panel-default">
                                <div class="panel-body">
                                    <p class="col-sm-4">{{ devices_online(devices) }}% Online</p>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 60%">
                                            <span class="sr-only">20% Complete (success)</span>
                                        </div>
                                      
                                    </div>
                                </div>
                            </div>
                           
                            <div class="panel_positive panel-default">
                                <div class="panel-body">
                                    <p class="col-sm-4">{{ devices_offline(devices) }}% Offline</p>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
                                            <span class="sr-only">1% Complete (warning)</span>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
    
  `,
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

export class OverviewComponent  { 
  name = 'Angular'; 
  devices = DEVICES;
  selectedDevice: Device;

  onSelect(device: Device): void {
      this.selectedDevice = device;
  }

  check_offline(device: any){
    let obj: Device = device;
    if (obj.status == false){
      return true;
    }
    
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
            else if ((device.signalStrength < -70) && (device.signalStrength > -90)) {
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