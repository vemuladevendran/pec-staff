import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentiesComponent } from './menties.component';

const routes: Routes = [{ path: '', component: MentiesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentiesRoutingModule { }
