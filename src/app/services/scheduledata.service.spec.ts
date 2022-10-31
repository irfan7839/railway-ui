import { TestBed } from '@angular/core/testing';

import { ScheduledataService } from './scheduledata.service';

describe('ScheduledataService', () => {
  let service: ScheduledataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
