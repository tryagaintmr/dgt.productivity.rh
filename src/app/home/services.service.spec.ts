import { TestBed } from '@angular/core/testing';

import { DummyDataService } from './services.service';

describe('ServicesService', () => {
  let service: DummyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('')
});
