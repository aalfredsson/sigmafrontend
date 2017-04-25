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
        "location": "rum24",
        "status": true,
        "signalStrength": "-90 dbm",
        "battery": "65%",
        "lastSeen": "15 min"
    },
        {
            "id": 2,
            "name": "king2",
            "location": "rum23",
            "status": true,
            "signalStrength": "-62 dbm",
            "battery": "0%",
            "lastSeen": "10 min"
        },
        {
            "id": 3,
            "name": "king3",
            "location": "rum23",
            "status": false,
            "signalStrength": "-53 dbm",
            "battery": "80%",
            "lastSeen": "1 min"
        },
        {
            "id": 4,
            "name": "queen1",
            "location": "rum24",
            "status": true,
            "signalStrength": "-54 dbm",
            "battery": "44%",
            "lastSeen": "10 min"
        },
        {
            "id": 5,
            "name": "king4",
            "location": "rum25",
            "status": false,
            "signalStrength": "-23 dbm",
            "battery": "83%",
            "lastSeen": "1 min"
        }
    ]


}

let LOCATIONS = {
  "locations":
  [{
    "id": 20,
    "name": "dockplatsen1",
    "rooms": [
    {
      "id": 15,
      "name": "rum23",
      "devices": [
        {
          "id": 5,
          "name": "king3"
        },
        {
          "id": 4,
          "name": "king2"
        }
      ]},
      {
      "id": 25,
      "name": "rum24",
      "devices": [
        {
          "id": 3,
          "name": "king1"
        },
        {
          "id": 2,
          "name": "queen1"
        }
      ]
      }


    ]},
  {
    "id": 10,
    "name": "orkanen",
    "rooms": [{
      "id": 1,
      "name": "rum25"
    }]
  } 
]}





@Component({
    selector: 'my-app',
    template: `
  <h1>Hello {{name}}</h1>
  <div class="location-box">
    <select id="device_location_list" (change)="onChange()">
      <ng-container *ngFor="let location of locations.locations;">
        <option *ngFor="let room of location.rooms" value="{{room.name}}">{{room.name}}</option>
      </ng-container>
    </select>

    <ng-container *ngFor="let device of devices.devices">
      <div class="list-item" *ngIf="device_by_room(device)" (click)="onSelect(device)">
        <span>ID: {{ device.id }} Name: {{ device.name }}</span>
        <span class="spawn">{{ device.status }}</span>
      </div>
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
  locations = LOCATIONS;
  devices = DEVICES;
  selectedDevice: Device;
  selectedRoom: string;

  onSelect(device: Device): void {
      this.selectedDevice = device;
  }

  onChange(): void {
    var mySelect: any = document.getElementById("device_location_list");
    var selectedRoom: string = mySelect.options[mySelect.selectedIndex].value;
    this.selectedRoom = selectedRoom;
  }

  device_by_room(device: any){
    if (device.location == this.selectedRoom){
      return true;
    }
  }

  check_offline(device: any){
    let obj: Device = device;
    if (obj.status == true){
      return true;
    }
  }

  check_location(device: any){
    //skapa ny lista för varje location och sätt location som header ovanför respektive lista
    console.log(this.selectedRoom);
    if(device["location"] == this.selectedRoom){
      return true;
    }
    
  }



}