import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarksRoutingModule } from './marks-routing.module';
import { MarksComponent } from './marks.component';
import { UploadMarksSetComponent } from './upload-marks-set/upload-marks-set.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { UploadMarksComponent } from './upload-marks/upload-marks.component';

const materialModules = [
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
]

@NgModule({
  declarations: [
    MarksComponent,
    UploadMarksSetComponent,
    UploadMarksComponent
  ],
  imports: [
    CommonModule,
    MarksRoutingModule,
    ReactiveFormsModule,
    ...materialModules
  ]
})
export class MarksModule { }
