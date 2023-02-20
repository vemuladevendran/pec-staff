import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementService } from 'src/app/services/announcement/announcement.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UploadMarksSetComponent } from '../marks/upload-marks-set/upload-marks-set.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showLogout = false;
  announcementDetails: any[] = [];
  constructor(
    private authServe: AuthService,
    private announcServe: AnnouncementService,
    public dialog: MatDialog,
  ) { }


  toggeleLogout(): void {
    this.showLogout = !this.showLogout;
  }

  // log out
  logOut() {
    this.authServe.logout();
  }

  async getBannerDetails(): Promise<void> {
    try {
      const data = await this.announcServe.getAnnouncements();
      this.announcementDetails = data.data;
    } catch (error) {
      console.log(error);

    }
  }

  // open selection set
  selectionSet(): void {
    this.dialog.open(UploadMarksSetComponent, {
      panelClass: 'my-dialog'
    })
  };
  
  ngOnInit(): void {
    this.getBannerDetails();
  }

}
