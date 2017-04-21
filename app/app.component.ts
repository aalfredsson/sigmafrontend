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
			"location": "staden3",
			"status": false
		},
		{
			"id": 2,
			"name": "king2",
			"location": "1408",
			"status": false
		},
		{
			"id": 3,
			"name": "king3",
			"location": "1408",
			"status": true
		},
		{
			"id": 4,
			"name": "kingen",
			"location": "staden3",
			"status": true
		},
		{
			"id": 5,
			"name": "queen",
			"location": "rummet21",
			"status": true
		}
	]


}



@Component({
  selector: 'my-app',
  template: `
  <h1>Hello {{name}}</h1>
  

  <ng-container *ngFor="let device of devices.devices">
    <ng-container *ngIf="check_location(device)">
      <div class="list-item" *ngIf="check_offline(device)" (click)="onSelect(device)">
        <span>ID: {{ device.id }} Name: {{ device.name }}</span>
        <span class="spawn">{{ device.status }}</span>
      </div>
    </ng-container>
  </ng-container>

  
  
  <div *ngIf="selectedDevice">
    <p>{{ selectedDevice.location }}</p>
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
    if (obj.status == false){
      return true;
    }
  }

  check_location(device: any){
    //skapa ny lista för varje location och sätt location som header ovanför respektive lista
    if(device["location"] == "1408"){
      return true;
    }
    
  }

}