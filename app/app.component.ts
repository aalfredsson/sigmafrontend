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
        "name": "king1",
        "location": "rum21",
        "status": false,
        "signalStrength": "-90 dbm",
        "battery": "65%",
        "lastSeen": "15 min"
    },
        {
            "id": 2,
            "name": "king2",
            "location": "rum22",
            "status": false,
            "signalStrength": "-62 dbm",
            "battery": "0%",
            "lastSeen": "10 min"
        },
        {
            "id": 3,
            "name": "king3",
            "location": "rum23",
            "status": true,
            "signalStrength": "-53 dbm",
            "battery": "80%",
            "lastSeen": "1 min"
        },
        {
            "id": 4,
            "name": "king3",
            "location": "rum23",
            "status": false,
            "signalStrength": "-54 dbm",
            "battery": "44%",
            "lastSeen": "10 min"
        },
        {
            "id": 5,
            "name": "king3",
            "location": "rum23",
            "status": false,
            "signalStrength": "-23 dbm",
            "battery": "83%",
            "lastSeen": "1 min"
        }
    ]


}





@Component({
    selector: 'my-app',
    template: `
  <h1>Hello {{name}}</h1>
  <div class="location-box">
    <select id="device_location_list">
      <ng-container *ngFor="let device of devices.devices">
        <option *ngIf="no_duplicates(device)">{{device.location}}</option>
      </ng-container>
    </select>

    <ng-container *ngFor="let device of devices.devices">
      <ng-container *ngIf="check_location(device)">
        <div class="list-item" *ngIf="check_offline(device)" (click)="onSelect(device)">
          <span>ID: {{ device.id }} Name: {{ device.name }}</span>
          <span class="spawn">{{ device.status }}</span>
        </div>
      </ng-container>
    </ng-container>
  </div>

  <div *ngIf="selectedDevice">
    <ul>
      <li>{{ selectedDevice.signalStrength }}</li>
      <li>{{ selectedDevice.battery }}</li>
      <li>{{ selectedDevice.lastSeen }}</li>
    </ul>
  </div>`,
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

export class AppComponent  { 
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

  check_location(device: any){
    //skapa ny lista för varje location och sätt location som header ovanför respektive lista
    if(device["location"] == "rum23"){
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