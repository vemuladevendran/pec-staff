import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showLogout = false;
  constructor(
    private authServe: AuthService,
  ) { }


  toggeleLogout(): void {
    this.showLogout = !this.showLogout;
  }

  // log out
  logOut(){
    this.authServe.logout();
  }
  ngOnInit(): void {
  }

}
