import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemEditViewComponent} from './item-edit-view.component';

describe('ItemEditViewComponent', () => {
  let component: ItemEditViewComponent;
  let fixture: ComponentFixture<ItemEditViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemEditViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
