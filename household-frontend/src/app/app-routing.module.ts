import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InventoryListComponent} from "./inventory/inventory-list/inventory-list.component";


const routes: Routes = [
  {
    path: 'inventory',
    component: InventoryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
