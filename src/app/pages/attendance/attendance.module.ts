import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { MarkAttendanceComponent } from './mark-attendance/mark-attendance.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AbsentListComponent } from './absent-list/absent-list.component';
import {MatDialogModule} from '@angular/material/dialog'; 

const materialModules = [
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatCardModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
]


@NgModule({
  declarations: [
    AttendanceComponent,
    MarkAttendanceComponent,
    AbsentListComponent,
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    ReactiveFormsModule,
    ...materialModules,
  ]
})
export class AttendanceModule { }
