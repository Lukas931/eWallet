import { TestBed } from '@angular/core/testing';

import { BillItemsAdjustmentService } from './bill-items-adjustment.service';

describe('BillItemsAdjustmentService', () => {
  let service: BillItemsAdjustmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillItemsAdjustmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
