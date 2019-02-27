import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  uri = 'http://aer.primetelecom.ro:4000/waspdata';

  constructor(private http: HttpClient) { }

  getSensorData() {
    return this.http.get(`${this.uri}`);
  }
  getLastLimitSensorData(limit) {
    return this.http.get(`${this.uri}/limit/${limit}`);
  }
  getLastSensorData() {
    return this.http.get(`${this.uri}/last/`);
  }

}
