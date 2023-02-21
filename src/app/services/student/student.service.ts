import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient,
    private settings: SettingsService,

  ) { }

  // get students
  getStudents(filters?: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/students`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  }

  // get student by id
  getStudentById(id: string): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/student/${id}`;
    return lastValueFrom(this.http.get(url));
  }
 
}