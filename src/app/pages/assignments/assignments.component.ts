import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { AssignmentsService } from 'src/app/services/assignments/assignments.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  assignmentDetails: any[] = [];
  staffDetails: any;
  filtersForm: FormGroup;
  filters = {};
  subjectList: any[] = [];
  showFilters = false;
  constructor(
    private loader: NgxSpinnerService,
    private toast: ToastrService,
    private assignmentsServe: AssignmentsService,
    private fb: FormBuilder,
    private tokenServe: TokenService
  ) {
    this.filtersForm = this.fb.group({
      departmentName: [''],
      year: [''],
      subject: [''],
    });
    this.filtersForm.valueChanges.pipe(debounceTime(600))
      .subscribe(() => {
        this.filters = this.filtersForm?.value;
        this.getAssignmentDetails(this.filtersForm?.value);
      });
  }



  // assignmentdetails
  async getAssignmentDetails(filters: any): Promise<void> {
    try {
      this.loader.show();
      const data: any = await this.assignmentsServe.getAssignments(filters);
      this.assignmentDetails = data;
    } catch (error) {
      console.log(error);
      this.toast.error("Fail to load");
    } finally {
      this.loader.hide();
    }
  };


  async getStaffDetails(): Promise<void> {
    try {
      this.staffDetails = await this.tokenServe.getTokenData();
      this.setFormValues();
      this.getAssignmentDetails(this.filtersForm.value);
    } catch (error) {
      console.log(error);
    }
  };


  setFormValues() {
    this.filtersForm.controls['departmentName'].setValue(this.staffDetails?.department);
    this.filtersForm.controls['subject'].setValue(this.staffDetails?.majorSubject);
    this.subjectList = this.staffDetails?.handlingSubjects;
    this.subjectList.push(this.staffDetails?.majorSubject);
  };

  ngOnInit(): void {
    this.getStaffDetails();
  }

}
