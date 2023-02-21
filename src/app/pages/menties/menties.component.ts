import { Component, OnInit } from '@angular/core';
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
  ) { }


  // menties list
  async getMentiesList(): Promise<void> {
    try {
      this.loader.show();
      this.mentiesList = await this.mentiesServe.getMenties();
      console.log(this.mentiesList, '===============');

    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load the details');
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getMentiesList();
  }

}
