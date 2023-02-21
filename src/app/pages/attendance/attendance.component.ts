import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { TokenService } from 'src/app/services/token/token.service';
import { AbsentListComponent } from './absent-list/absent-list.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  attendanceReports: any[] = [];
  filtersForm: FormGroup;
  maxDate = new Date();
  filters = {};
  constructor(
    private attendanceServe: AttendanceService,
    private tokenServe: TokenService,
    private toast: ToastrService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.filtersForm = this.fb.group({
      date: [new Date()],
      departmentName: [''],
      year: [''],
    });
    this.filtersForm.valueChanges.pipe(debounceTime(800))
      .subscribe(() => {
        this.filters = this.filtersForm?.value;
        this.getAttendanceReport(this.filters);
      });
  }

  // get attendance report
  async getAttendanceReport(filters: any): Promise<void> {
    try {
      const data = await this.attendanceServe.getAttendanceDetails(filters);
      this.attendanceReports = data.data;
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    }
  }

  // get token data
  async getTokenData(): Promise<void> {
    const data = await this.tokenServe.getTokenData();
    this.filtersForm.controls['departmentName'].setValue(data?.department);
    this.filters = {
      departmentName: data?.department,
    }
    this.getAttendanceReport(this.filters);
  }



  // opendialog

  absentList(data: any): void {
    this.dialog.open(AbsentListComponent, {
      height:'80%',
      maxWidth: '95vw',
      width:'100%',
      data: {
        data
      }
    })
  };

  ngOnInit(): void {
    this.getTokenData();
  }

}
