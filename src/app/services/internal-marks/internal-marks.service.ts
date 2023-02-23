import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class InternalMarksService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService,

  ) { }

  uploadMarks(data: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/internal-marks`;
    return lastValueFrom(this.http.post(url, data));
  }

  getMarks(filters?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/internal-marks`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  };

  getMarksByStudent(examNumber: any, semester?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/internal-marks/student/${examNumber}`;
    return lastValueFrom(this.http.get(url, {
      params: semester,
    }));
  };

  getMarksById(id: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/internal-marks/${id}`;
    return lastValueFrom(this.http.get(url));
  };

  getSemesterMarksByStudent(examNumber: any, semester?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/semester-marks/student/${examNumber}`;
    return lastValueFrom(this.http.get(url, {
      params: semester,
    }));
  }
}