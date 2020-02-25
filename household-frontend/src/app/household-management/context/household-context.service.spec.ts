import {TestBed} from '@angular/core/testing';

import {HouseholdContextService} from './household-context.service';

describe('HouseholdContextService', () => {
  let service: HouseholdContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseholdContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
