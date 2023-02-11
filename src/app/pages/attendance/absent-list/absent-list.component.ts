import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-absent-list',
  templateUrl: './absent-list.component.html',
  styleUrls: ['./absent-list.component.scss']
})
export class AbsentListComponent implements OnInit {
  students:any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.students = this.data.data;
  }

}
