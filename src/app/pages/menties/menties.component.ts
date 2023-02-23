import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MentiesService } from 'src/app/services/menties/menties.service';

@Component({
  selector: 'app-menties',
  templateUrl: './menties.component.html',
  styleUrls: ['./menties.component.scss']
})
export class MentiesComponent implements OnInit {
  mentiesList: any[] = [];
  constructor(
    private loader: NgxSpinnerService,
    private toast: ToastrService,
    private mentiesServe: MentiesService,
    private router: Router,
  ) { }


  // menties list
  async getMentiesList(): Promise<void> {
    try {
      this.loader.show();
      this.mentiesList = await this.mentiesServe.getMenties();
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load the details');
    } finally {
      this.loader.hide();
    }
  };

  // view student
  viewStudent(id: string) {
    this.router.navigate([`/menties/${id}`]);
  }

  ngOnInit(): void {
    this.getMentiesList();
  }

}
