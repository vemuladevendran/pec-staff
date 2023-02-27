import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMarksComponent } from './assign-marks.component';

describe('AssignMarksComponent', () => {
  let component: AssignMarksComponent;
  let fixture: ComponentFixture<AssignMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignMarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
