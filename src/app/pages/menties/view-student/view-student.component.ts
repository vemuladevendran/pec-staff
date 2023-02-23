import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { InternalMarksService } from 'src/app/services/internal-marks/internal-marks.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {

  studentData: any;
  attendanceData: any[] = [];
  marksData: any = [];
  semesterMarksDetails: any[] = [];
  studentId: string = '';
  constructor(
    private loader: NgxSpinnerService,
    private toast: ToastrService,
    private studentServe: StudentService,
    private route: ActivatedRoute,
    private attendanceServe: AttendanceService,
    private marksServe: InternalMarksService,
  ) {
    this.studentId = this.route.snapshot.paramMap.get('id') ?? '';
  }


  async getStudentData(): Promise<void> {
    try {
      this.loader.show();
      this.studentData = await this.studentServe.getStudentById(this.studentId);
      this.getAttendance();
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load');
    } finally {
      this.loader.hide();
    }
  };

  async getAttendance(): Promise<void> {
    try {
      this.attendanceData = await this.attendanceServe.getAttendanceDetailsByStudent(this.studentData.examNumber);
      this.getMarksData();
    } catch (error) {
      console.error(error);
      this.toast.error('Fail to Load Attendance Data');
    }
  };

  async getMarksData(): Promise<void> {
    try {
      this.marksData = await this.marksServe.getMarksByStudent(this.studentData.examNumber);
      this.getSemesterMarksData();
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load marks')
    };
  }

  async getSemesterMarksData(): Promise<void> {
    try {
      const data = await this.marksServe.getSemesterMarksByStudent(this.studentData.examNumber);
      this.semesterMarksDetails = data.data;
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load semester marks')
    }
  }

  ngOnInit(): void {
    this.getStudentData();
  }

}
