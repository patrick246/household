import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemCreateViewComponent} from './item-create-view.component';

describe('ItemCreateViewComponent', () => {
  let component: ItemCreateViewComponent;
  let fixture: ComponentFixture<ItemCreateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemCreateViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
