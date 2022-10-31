import { TestBed } from '@angular/core/testing';

import { SeatChartService } from './seat-chart.service';

describe('SeatChartService', () => {
  let service: SeatChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
