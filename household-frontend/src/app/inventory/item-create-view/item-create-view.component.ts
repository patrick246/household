import {Component, OnInit} from '@angular/core';
import {Item} from "../service/Item";
import {InventoryService} from "../service/inventory.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-item-create-view',
  templateUrl: './item-create-view.component.html',
  styleUrls: ['./item-create-view.component.scss']
})
export class ItemCreateViewComponent implements OnInit {

  public item: Item = {
    id: undefined,
    name: '',
    count: 1,
    location: ''
  };

  constructor(private inventoryService: InventoryService, private snackbar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
  }

  create() {
    this.inventoryService.create(this.item).subscribe(() => {
      this.snackbar.open('Item saved', 'Dismiss', {duration: 1000});
    });
  }

  cancel() {
    this.router.navigate(['/', 'inventory']);
  }

}
