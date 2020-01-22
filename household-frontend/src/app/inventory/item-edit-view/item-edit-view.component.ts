import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {InventoryService} from "../service/inventory.service";
import {Item} from "../service/Item";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-item-edit-view',
  templateUrl: './item-edit-view.component.html',
  styleUrls: ['./item-edit-view.component.scss']
})
export class ItemEditViewComponent implements OnInit {

  public item: Item;

  constructor(
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.inventoryService.getItem(id))
    ).subscribe(item => {
      this.item = item;
    });
  }

  onSave(item: Item) {
    this.inventoryService.update(item).subscribe(result => {
      this.snackbar.open('Item saved', 'Dismiss', {duration: 1000});
    });
  }

  onCancel() {
    this.router.navigate(['/inventory']);
  }
}
