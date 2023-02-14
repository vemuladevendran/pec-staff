import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InternalMarksService } from 'src/app/services/internal-marks/internal-marks.service';

@Component({
  selector: 'app-show-marks',
  templateUrl: './show-marks.component.html',
  styleUrls: ['./show-marks.component.scss']
})
export class ShowMarksComponent implements OnInit {
  marksId = '';
  markDetails:any;
  constructor(
    private toast: ToastrService,
    private loader: NgxSpinnerService,
    private marksServe: InternalMarksService,
    private route: ActivatedRoute
  ) {
    this.marksId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  // marks
  async getMarkDetails():Promise<void>{
    try {
      this.loader.show();
      this.markDetails = await this.marksServe.getMarksById(this.marksId);
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load');
    }finally{
      this.loader.hide();
    }
  }

  printMarks(){
    window.print();
  }

  ngOnInit(): void {
    this.getMarkDetails();
  }

}
