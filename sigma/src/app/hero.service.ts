import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Device } from './device';

@Injectable()
export class DeviceService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'http://intelligentmonitoringapi.azurewebsites.net/api/Devices';

  constructor(private http: Http) { }

  getHeroes(): Promise<Device[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().devices as Device[])
               .catch(this.handleError);
  }

  getHero(id: string): Promise<Device> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().device as Device)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

