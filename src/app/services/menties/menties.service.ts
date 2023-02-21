import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class MentiesService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService,

  ) { }

  // get menties
  getMenties(): Promise<any> {
    const url = `${this.settings.API_BASE_URL}/menties`;
    return lastValueFrom(this.http.get(url));
  }

}