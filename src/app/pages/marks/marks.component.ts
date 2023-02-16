import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { DepartmentService } from 'src/app/services/department/department.service';
import { InternalMarksService } from 'src/app/services/internal-marks/internal-marks.service';
import { UploadMarksSetComponent } from './upload-marks-set/upload-marks-set.component';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarksComponent implements OnInit {
  filters = {};
  marksList: any[] = [];
  departmentList: any[] = [];
  filtersForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    private marksServe: InternalMarksService,
    private toast: ToastrService,
    private loader: NgxSpinnerService,
    private router: Router,
    private departmentServe: DepartmentService,
    private fb: FormBuilder,
  ) {
    this.filtersForm = this.fb.group({
      departmentName: [''],
      year: [''],
      exam: [''],
    });
    this.filtersForm.valueChanges.pipe(debounceTime(800))
    .subscribe(() => {
      this.filters = this.filtersForm?.value
      this.getMarksDetails(this.filters);
    });
  }


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
  showMarks(id: string) {
    this.router.navigate([`marks/details/${id}`])
  }

  async getDepartments(): Promise<void> {
    try {
      this.departmentList = await this.departmentServe.getDepartmentDetails();
    } catch (error) {
      console.log(error);

    }
  }

  ngOnInit(): void {
    this.getMarksDetails(this.filters);
    this.getDepartments();
  }

}
