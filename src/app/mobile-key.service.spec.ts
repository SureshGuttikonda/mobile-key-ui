import { TestBed } from '@angular/core/testing';

import { MobileKeyService } from './mobile-key.service';

describe('MobileKeyService', () => {
  let service: MobileKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
