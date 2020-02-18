import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Item} from "../service/Item";
import {NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {

  public scanning: boolean = false;

  @Input()
  public item: Item;

  @Output()
  private save: EventEmitter<Item> = new EventEmitter<Item>();

  @Output()
  private cancel: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('form', {static: false})
  private form: NgForm;

  @ViewChild('closeDialog', {static: false})
  public closeDialog: TemplateRef<unknown>;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    console.log(this.item);
  }

  isDirty(): boolean {
    return this.form.dirty;
  }

  doSave(): void {
    this.save.emit(this.item);
    Object.keys(this.form.controls).forEach(control => {
      this.form.controls[control].markAsPristine();
    });
  }

  public doCancel(): void {
    if (this.isDirty()) {
      this.dialog.open(this.closeDialog).afterClosed().subscribe(shouldClose => {
        if (shouldClose) {
          this.cancel.emit();
        }
      });
      return;
    }
    this.cancel.emit();
  }
}
