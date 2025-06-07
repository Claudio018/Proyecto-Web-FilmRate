import { TestBed } from '@angular/core/testing';

import { TmbdService } from './tmbd.service';

describe('TmbdService', () => {
  let service: TmbdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmbdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
