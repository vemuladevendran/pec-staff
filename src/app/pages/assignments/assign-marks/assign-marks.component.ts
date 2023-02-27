import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AssignmentsService } from 'src/app/services/assignments/assignments.service';

@Component({
  selector: 'app-assign-marks',
  templateUrl: './assign-marks.component.html',
  styleUrls: ['./assign-marks.component.scss']
})
export class AssignMarksComponent implements OnInit {

  marksForm: FormGroup;
  marksData: any;
  constructor(
    private loader: NgxSpinnerService,
    private toast: ToastrService,
    private assignmentServe: AssignmentsService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AssignMarksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.marksForm = this.fb.group({
      marks: ['', Validators.required],
    });
  }

  async handleSubmit(): Promise<void> {
    try {
      console.log(this.marksForm.value, this.marksData?.id, '=======');
      this.loader.show();
      await this.assignmentServe.assignMarks(this.marksForm.value, this.marksData?.id);
      this.toast.info(`Marks Assigned for ${this.marksData.name} for Assignment- ${this.marksData.assignment}`);
      this.dialogRef.close();
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to upload');
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.marksData = this.data?.data;
  }

}
