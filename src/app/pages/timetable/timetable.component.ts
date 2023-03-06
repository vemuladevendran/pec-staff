import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TimeTableService } from 'src/app/services/time-table/time-table.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  timeTableList: any[] = [];
  filters = {}
  teacherSubject = '';
  constructor(
    private timeTableServe: TimeTableService,
    private toast: ToastrService,
    private tokenServe: TokenService,
    private loader: NgxSpinnerService,
  ) { }


  // get timetables
  async getTimeTables(filters:any): Promise<void> {
    try {
      this.loader.show();
      const data = await this.timeTableServe.getTimeTable(filters);
      this.timeTableList = data.data;
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    }finally{
      this.loader.hide();
    }
  }

  // token data
  async getTokenData(): Promise<void> {
    const data = await this.tokenServe.getTokenData();
    this.filters = {
      departmentName: data?.department,
    }
    this.getTimeTables(this.filters);
    this.teacherSubject = data?.majorSubject;
  }


  ngOnInit(): void {
    this.getTokenData();
  }

}
