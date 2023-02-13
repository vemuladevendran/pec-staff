import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadMarksSetComponent } from './upload-marks-set/upload-marks-set.component';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarksComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }


  // open selection set
  selectionSet(): void {
    this.dialog.open(UploadMarksSetComponent, {
      panelClass: 'my-dialog'
    })
  };

  ngOnInit(): void {
  }

}
