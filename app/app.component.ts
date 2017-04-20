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
    <ng-container *ngFor="let device of devices.devices">
      <li class="list-item" *ngIf="check_offline(device)" (click)="onSelect(device)">
        <span>{{device.id}}: {{device.name}}</span>
      </li>
    </ng-container>
  </ul>
  
  <div *ngIf="selectedDevice">
    <p>{{ selectedDevice.name }}</p>
  </div>`,
  styles: [`
    .list-item {
      list-style: none;
      padding: 10px;
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 25px;
      margin-bottom: 10px;
      width: 25%;
    }`]
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
    if (obj.status == true){
      return true;
    }
  }

}

