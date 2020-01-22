import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InventoryListComponent} from "./inventory/inventory-list/inventory-list.component";
import {ItemEditViewComponent} from "./inventory/item-edit-view/item-edit-view.component";
import {ItemCreateViewComponent} from "./inventory/item-create-view/item-create-view.component";


const routes: Routes = [
  {
    path: 'inventory',
    component: InventoryListComponent,
    children: [
      {
        path: 'new',
        component: ItemCreateViewComponent
      },
      {
        path: ':id',
        component: ItemEditViewComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
