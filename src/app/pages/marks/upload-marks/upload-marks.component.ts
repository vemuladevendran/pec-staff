import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InternalMarksService } from 'src/app/services/internal-marks/internal-marks.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-upload-marks',
  templateUrl: './upload-marks.component.html',
  styleUrls: ['./upload-marks.component.scss']
})
export class UploadMarksComponent implements OnInit {
  department = '';
  year = '';
  semester = '';
  studentsList: any = [];
  subject = '';
  section = '';
  marksForm: FormGroup | any;
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private loader: NgxSpinnerService,
    private studentServe: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private marksServe: InternalMarksService,
  ) {
    this.department = this.route.snapshot.paramMap.get('department') ?? '';
    this.year = this.route.snapshot.paramMap.get('year') ?? '';
    this.semester = this.route.snapshot.paramMap.get('semester') ?? '';
    this.subject = this.route.snapshot.paramMap.get('subject') ?? '';
    this.section = this.route.snapshot.paramMap.get('section') ?? '';
    this.init();
  }

  init() {
    this.marksForm = this.fb.group({
      exam: ['', Validators.required],
      departmentName: ['', Validators.required],
      year: ['', Validators.required],
      semester: ['', Validators.required],
      subject: ['', Validators.required],
      students: this.fb.array([]),
    })
  }


  // get students
  async getStudentsList(): Promise<void> {
    try {
      this.loader.show();
      const filters = {
        department: this.department,
        year: this.year,
        section: this.section === 'all' ? '' : this.section,
      }
      
      const data = await this.studentServe.getStudents(filters);
      this.studentsList = data?.data;
      this.createMarkList();
    } catch (error) {
      console.log(error);
      this.toast.error('fail to fetch students')
    } finally {
      this.loader.hide();
    }
  }

  // set department details
  setDepartmentDetails() {
    this.marksForm.controls['departmentName'].setValue(this.department);
    this.marksForm.controls['year'].setValue(this.year);
    this.marksForm.controls['subject'].setValue(this.subject);
    this.marksForm.controls['semester'].setValue(this.semester);
  }
  // create student list for entering marks
  createMarkList(): void {
    const att = this.marksForm.get('students') as FormArray;
    this.studentsList.map((x: any) => {
      att.push(this.fb.group({
        examNumber: [x.examNumber, Validators.required],
        studentName: [x.studentName, Validators.required],
        marks: ['', Validators.required],
      }))
    });
    this.setDepartmentDetails();
  }


  // on submit
  async handleSubmit(): Promise<void> {
    try {
      this.loader.show();
      const data = this.marksForm.value;
      const result = await this.marksServe.uploadMarks(data);
      this.toast.success(result?.message);
      this.router.navigate(['/marks']);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getStudentsList();
  }

}
