import {TestBed} from '@angular/core/testing';

import {HouseholdManagementService} from './household-management.service';

describe('HouseholdManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HouseholdManagementService = TestBed.get(HouseholdManagementService);
    expect(service).toBeTruthy();
  });
});
