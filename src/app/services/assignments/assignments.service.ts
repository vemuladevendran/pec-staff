import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  constructor(
    private http: HttpClient,
    private settings: SettingsService,

  ) { }

  getAssignments(filters: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/assignments`;
    return lastValueFrom(this.http.get(url, {
      params: filters,
    }));
  };

  assignMarks(data: any, id: any): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/assignments/${id}`;
    return lastValueFrom(this.http.put(url, data));
  };
}
