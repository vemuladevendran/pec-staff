import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentiesRoutingModule } from './menties-routing.module';
import { MentiesComponent } from './menties.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import {MatStepperModule} from '@angular/material/stepper'; 
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MentiesComponent,
    ViewStudentComponent
  ],
  imports: [
    CommonModule,
    MentiesRoutingModule,
    MatStepperModule,
    MatExpansionModule,
    MatIconModule,
  ]
})
export class MentiesModule { }
