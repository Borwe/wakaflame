import { TestBed } from '@angular/core/testing';

import { ObserverHolderService } from './observer-holder.service';

describe('ObserverHolderService', () => {
  let service: ObserverHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObserverHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
