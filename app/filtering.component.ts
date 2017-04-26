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
        "location": "rum24",
        "status": true,
        "signalStrength": "-90 dbm",
        "battery": "65%",
        "lastSeen": "15 min"
    },
        {
            "id": 2,
            "name": "Device 2",
            "location": "rum23",
            "status": true,
            "signalStrength": "-62 dbm",
            "battery": "0%",
            "lastSeen": "10 min"
        },
        {
            "id": 3,
            "name": "Device 3",
            "location": "rum23",
            "status": false,
            "signalStrength": "-53 dbm",
            "battery": "80%",
            "lastSeen": "1 min"
        },
        {
            "id": 4,
            "name": "Device 4",
            "location": "rum24",
            "status": true,
            "signalStrength": "-54 dbm",
            "battery": "44%",
            "lastSeen": "10 min"
        },
        {
            "id": 5,
            "name": "Device 5",
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
    selector: 'filter-devices',
    template: `
  <div class="location-box">
    <select id="device_location_list" (change)="onChange()">
        <option disabled selected>Välj rum</option>
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
 `,
    
})

export class FilteringComponent  { 
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