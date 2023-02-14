import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InternalMarksService } from 'src/app/services/internal-marks/internal-marks.service';
import { UploadMarksSetComponent } from './upload-marks-set/upload-marks-set.component';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarksComponent implements OnInit {
  filters = {};
  marksList:any[] = [];
  constructor(
    public dialog: MatDialog,
    private marksServe: InternalMarksService,
    private toast: ToastrService,
    private loader: NgxSpinnerService,
    private router: Router,
  ) { }


  // open selection set
  selectionSet(): void {
    this.dialog.open(UploadMarksSetComponent, {
      panelClass: 'my-dialog'
    })
  };

  // get marks
  async getMarksDetails(filters: any): Promise<void> {
    try {
      this.loader.show();
      const data = await this.marksServe.getMarks(filters);
      this.marksList = data.data;
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to fetch details')
    } finally {
      this.loader.hide();
    }
  }

  // show marks
  showMarks(id:string){
 this.router.navigate([`marks/details/${id}`])
  }


  ngOnInit(): void {
    this.getMarksDetails(this.filters)
  }

}
