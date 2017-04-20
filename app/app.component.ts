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
			"status": false

		},
		{
			"id": 2,
			"name": "king2",
			"location": "rum22",
			"status": false
		},
		{
			"id": 3,
			"name": "king3",
			"location": "rum23",
			"status": true
		}
	]


}



@Component({
  selector: 'my-app',
  template: `
  <h1>Hello {{name}}</h1>
  <ul>
    <li *ngFor="let device of devices.devices" (click)="onSelect(device)">

      <span *ngIf="check_offline(device)">{{device.id}}: {{device.name}}</span>
    </li>
  </ul>
  <div *ngIf="selectedDevice">
    <p>{{ selectedDevice.name }}</p>
  </div>`,
})

export class AppComponent  { 
  name = 'Angular'; 
  devices = DEVICES;
  selectedDevice: Device;
  onSelect(device: Device): void {
      this.selectedDevice = device;
  }
  check_offline(device: any){
    console.log(device);
    let obj: Device = device;
    if (obj.status == true){
      return true;
    }
  }

}

