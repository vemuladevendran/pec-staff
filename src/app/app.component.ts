import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pec-staff';

  get isOnline(): boolean {
    return navigator.onLine;
  }
  constructor() {

  }

}
