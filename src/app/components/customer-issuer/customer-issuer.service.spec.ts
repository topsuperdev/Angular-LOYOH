import { TestBed } from '@angular/core/testing';

import { CustomerIssuerService } from './customer-issuer.service';

describe('CustomerIssuerService', () => {
  let service: CustomerIssuerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerIssuerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
