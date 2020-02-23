import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {OAuthModule} from "angular-oauth2-oidc";
import {environment} from "../environments/environment";
import {HttpClientModule} from "@angular/common/http";
import {InventoryListComponent} from './inventory/inventory-list/inventory-list.component';
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ItemEditComponent} from './inventory/item-edit/item-edit.component';
import {FormsModule} from "@angular/forms";
import {ItemEditViewComponent} from './inventory/item-edit-view/item-edit-view.component';
import {ItemCreateViewComponent} from './inventory/item-create-view/item-create-view.component';
import {ItemSearchComponent} from './inventory/item-search/item-search.component';
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {HouseholdManagementComponent} from './household-management/household-management.component';
import {HouseholdCardComponent} from './household-management/household-card/household-card.component';
import {RoleFilterPipe} from './household-management/household-card/role-filter/role-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    InventoryListComponent,
    ItemEditComponent,
    ItemEditViewComponent,
    ItemCreateViewComponent,
    ItemSearchComponent,
    HouseholdManagementComponent,
    HouseholdCardComponent,
    RoleFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: Object.values(environment.backends),
        sendAccessToken: true
      }
    }),
    MatFormFieldModule,
    MatDialogModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatPaginatorModule,
    ZXingScannerModule,
    MatSelectModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
