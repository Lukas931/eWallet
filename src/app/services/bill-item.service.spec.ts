import { TestBed } from '@angular/core/testing';

import { BillItemService } from './bill-item.service';

describe('BillItemService', () => {
  let service: BillItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
