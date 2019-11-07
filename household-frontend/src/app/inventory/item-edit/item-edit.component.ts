import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Item} from "../service/Item";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {

  @Input()
  private item: Item;

  @ViewChild('form', {static: false})
  private form: NgForm;

  constructor() {
  }

  ngOnInit() {
  }

  isDirty(): boolean {
    return this.form.dirty;
  }
}
