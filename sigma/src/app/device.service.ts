import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Device } from './device';

@Injectable()
export class DeviceService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private devicesUrl = 'http://intelligentmonitoringapi.azurewebsites.net/api/Devices';
  private positionsUrl = 'http://intelligentmonitoringapi.azurewebsites.net/api/positions/device';

  constructor(private http: Http) { }

  getDevices(): Promise<Device[]> {
    return this.http.get(this.devicesUrl)
               .toPromise()
               .then(response => response.json().devices as Device[])
               .catch(this.handleError);
  }

  getDevice(id: string): Promise<Device> {
    const url = `${this.devicesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Device)
      .catch(this.handleError);
  }

    getPosition(id: string): Promise<Device> {
    const url = `${this.positionsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Device)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  } 
}