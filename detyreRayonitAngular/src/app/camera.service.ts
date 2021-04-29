import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera } from './Camera';
import { ChartDataModel } from './ChartDataModel';
import { ChartData } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private baseUrl = 'http://localhost:8080/api/cameras';
  private chartUrl = 'http://localhost:8080/api/cameras/chart';

  constructor(private http: HttpClient) { }

  getCamera(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCamera(camera: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, camera);
  }

  updateCamera(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteCamera(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getCamerasList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  chartData(): Observable<any> {
    return this.http.get(`${this.chartUrl}`);
  }

}