import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentiesComponent } from './menties.component';
import { ViewStudentComponent } from './view-student/view-student.component';

const routes: Routes = [
  { path: '', component: MentiesComponent },
  { path: ':id', component: ViewStudentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentiesRoutingModule { }
