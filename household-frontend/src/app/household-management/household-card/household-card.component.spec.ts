import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseholdCardComponent} from './household-card.component';

describe('HouseholdCardComponent', () => {
  let component: HouseholdCardComponent;
  let fixture: ComponentFixture<HouseholdCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HouseholdCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
