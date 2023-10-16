import { TestBed } from '@angular/core/testing';

import { SeqClientService } from './seq-client.service';

describe('SeqClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeqClientService = TestBed.get(SeqClientService);
    expect(service).toBeTruthy();
  });
});
