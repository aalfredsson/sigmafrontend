import { Component } from '@angular/core';

export class Device {
  id: number;
  name: string;
  location: string;
  status: boolean;
}



var DEVICES = {
  
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
    <li *ngFor="let device of devices.devices">
      <span>{{device.id}}</span>{{device.name}}
    </li>
  </ul>`,
})

export class AppComponent  { 
  name = 'Angular'; 
  devices = DEVICES;

}