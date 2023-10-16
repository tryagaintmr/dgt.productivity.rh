import { TestBed } from '@angular/core/testing';

import { AdalService } from './adal.service';

describe('AdalService', () => {
  let service: AdalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
