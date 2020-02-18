import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseholdManagementComponent} from './household-management.component';

describe('HouseholdManagementComponent', () => {
  let component: HouseholdManagementComponent;
  let fixture: ComponentFixture<HouseholdManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HouseholdManagementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
