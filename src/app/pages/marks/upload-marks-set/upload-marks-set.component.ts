import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department/department.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-upload-marks-set',
  templateUrl: './upload-marks-set.component.html',
  styleUrls: ['./upload-marks-set.component.scss']
})
export class UploadMarksSetComponent implements OnInit {
  departmentList: any[] = [];
  sectionList:any[] = [];
  filtersForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private departmentServe: DepartmentService,
    private tokenServe: TokenService,
    private route: Router,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<UploadMarksSetComponent>,
  ) {
    this.filtersForm = this.fb.group({
      departmentName: ['', Validators.required],
      year: ['', Validators.required],
      section: [''],
      semester: ['', Validators.required],
      subject: ['', Validators.required]
    })
  };


  async getDepartments(): Promise<void> {
    try {
      this.departmentList = await this.departmentServe.getDepartmentDetails();
      this.userData();
    } catch (error) {
      console.log(error);

    }
  }

  async userData(): Promise<void> {
    try {
      const data = await this.tokenServe.getTokenData();
      this.filtersForm.controls['departmentName'].setValue(data?.department);
      this.filtersForm.controls['subject'].setValue(data?.subject);
    } catch (error) {
      console.log(error);
    }
  }

  // onyear change get the sections

  async getSections(): Promise<void> {
    try {
      this.filtersForm.controls['section'].setValue('');
      this.sectionList = await this.departmentServe.getSections(this.filtersForm.value.departmentName, this.filtersForm.value.year);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message)
    }
  }

  // handel submit
  submit() {
    const data = this.filtersForm.value;
    this.route.navigate([`/marks/upload/${data.departmentName}/${data.year}/${data.section !== '' ? data.section : 'all'}/${data.semester}/${data.subject}`]);
    this.dialogRef.close();
  }


  ngOnInit(): void {
    this.getDepartments();
  }

}
