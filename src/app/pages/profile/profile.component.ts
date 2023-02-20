import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profiledata: any;
  constructor(
    private loader: NgxSpinnerService,
    private toast: ToastrService,
    private profileServe: ProfileService,
    private authServe: AuthService,
  ) { }


  async getProfileData(): Promise<void> {
    try {
      this.loader.show();
      this.profiledata = await this.profileServe.profileData();
    } catch (error: any) {
      console.log(error);
      this.toast.error('Fail to load')
    } finally {
      this.loader.hide();
    }
  }

  // log out
  logOut() {
    this.authServe.logout();
  }

  ngOnInit(): void {
    this.getProfileData();
  }

}
