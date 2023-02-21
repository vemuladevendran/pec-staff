import { TestBed } from '@angular/core/testing';

import { MentiesService } from './menties.service';

describe('MentiesService', () => {
  let service: MentiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
