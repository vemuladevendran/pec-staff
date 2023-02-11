import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance.component';
import { MarkAttendanceComponent } from './mark-attendance/mark-attendance.component';

const routes: Routes = [
  { path: '', component: AttendanceComponent },
  { path: 'mark-attendance', component: MarkAttendanceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
