import { TestBed } from '@angular/core/testing';

import { PassesService } from './passes.service';

describe('PassesService', () => {
  let service: PassesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
