import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarksComponent } from './marks.component';
import { UploadMarksComponent } from './upload-marks/upload-marks.component';

const routes: Routes = [
  { path: '', component: MarksComponent },
  { path: 'upload/:department/:year/:semester/:subject', component: UploadMarksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarksRoutingModule { }
