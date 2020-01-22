import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss']
})
export class ItemSearchComponent implements OnInit {

  @Output()
  public onValueChange: EventEmitter<string> = new EventEmitter<string>();

  public open: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggle() {
    console.log('toggle');
    this.open = !this.open;
  }
}
