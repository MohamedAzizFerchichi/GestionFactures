import { TestBed } from '@angular/core/testing';

import { PurchaseValidationService } from './purchase-validation.service';

describe('PurchaseValidationService', () => {
  let service: PurchaseValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
