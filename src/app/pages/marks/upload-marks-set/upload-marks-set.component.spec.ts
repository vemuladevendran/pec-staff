import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMarksSetComponent } from './upload-marks-set.component';

describe('UploadMarksSetComponent', () => {
  let component: UploadMarksSetComponent;
  let fixture: ComponentFixture<UploadMarksSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMarksSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMarksSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
