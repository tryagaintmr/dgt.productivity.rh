import { TestBed } from '@angular/core/testing';

import { HttpMockRequestInterceptorService } from './http-mock-request-interceptor.service';
import { HttpClientModule } from '@angular/common/http';

describe('HttpMockRequestInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: HttpMockRequestInterceptorService = TestBed.get(HttpMockRequestInterceptorService);
    expect(service).toBeTruthy();
  });
});
