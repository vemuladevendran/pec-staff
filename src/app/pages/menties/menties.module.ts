import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentiesRoutingModule } from './menties-routing.module';
import { MentiesComponent } from './menties.component';


@NgModule({
  declarations: [
    MentiesComponent
  ],
  imports: [
    CommonModule,
    MentiesRoutingModule
  ]
})
export class MentiesModule { }
