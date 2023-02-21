import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentiesComponent } from './menties.component';

describe('MentiesComponent', () => {
  let component: MentiesComponent;
  let fixture: ComponentFixture<MentiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
