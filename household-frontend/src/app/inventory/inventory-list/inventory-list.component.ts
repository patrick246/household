import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {InventoryService} from "../service/inventory.service";
import {Item} from "../service/Item";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ItemEditComponent} from "../item-edit/item-edit.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {

  public items$: Observable<Item[]>;
  public editItem?: Item;

  @ViewChild(ItemEditComponent, {static: false})
  public editor: ItemEditComponent;

  @ViewChild('closeDialog', {static: false})
  public closeDialog: TemplateRef<unknown>;

  constructor(private inventoryService: InventoryService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.items$ = this.inventoryService.getItemPage(0, 50)
      .pipe(
        map(result => result.data)
      );
  }

  public edit(item: Item) {
    this.editItem = {
      ...item
    };
  }

  public closeEditor(): void {
    if (this.editor.isDirty()) {
      this.dialog.open(this.closeDialog).afterClosed().subscribe(shouldClose => {
        if (shouldClose) {
          this.editItem = undefined;
        }
      });
      return;
    }
    this.editItem = undefined;
  }

}
