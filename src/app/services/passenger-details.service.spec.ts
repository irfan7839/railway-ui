import { TestBed } from '@angular/core/testing';

import { PassengerDetailsService } from './passenger-details.service';

describe('PassengerDetailsService', () => {
  let service: PassengerDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassengerDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
