import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentsRoutingModule } from './assignments-routing.module';
import { AssignmentsComponent } from './assignments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AssignMarksComponent } from './assign-marks/assign-marks.component';
import { MatDialogModule } from '@angular/material/dialog';
const materialModules = [
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatIconModule,
  MatExpansionModule,
  MatDialogModule,
]

@NgModule({
  declarations: [
    AssignmentsComponent,
    AssignMarksComponent
  ],
  imports: [
    CommonModule,
    AssignmentsRoutingModule,
    ReactiveFormsModule,
    ...materialModules,
  ]
})
export class AssignmentsModule { }
