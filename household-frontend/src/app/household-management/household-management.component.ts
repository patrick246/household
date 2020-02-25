import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HouseholdManagementService} from "./service/household-management.service";
import {PaginationResult} from "../api/PaginationResult";
import {Household} from "./service/household.model";
import {combineLatest, concat, Observable, of} from "rxjs";
import {filter, flatMap, map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {HouseholdContextService} from "./context/household-context.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-household-management',
  templateUrl: './household-management.component.html',
  styleUrls: ['./household-management.component.scss']
})
export class HouseholdManagementComponent implements OnInit {

  public households$: Observable<PaginationResult<Household[]>>;

  @ViewChild('deleteVerification')
  public deleteVerificationModal: TemplateRef<unknown>;

  constructor(private householdService: HouseholdManagementService,
              private activatedRoute: ActivatedRoute,
              private context: HouseholdContextService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.households$ = combineLatest(
      this.activatedRoute.paramMap.pipe(
        map(params => parseInt(params.get('page'), 10) || 0)
      ),
      concat(of(undefined), this.householdService.update$)
    ).pipe(
      flatMap(([page]) => this.householdService.getPage(page, 5))
    );
  }

  select(household: Household) {
    this.context.selectHousehold(household.id);
  }

  delete(household: Household) {
    this.dialog.open(this.deleteVerificationModal).afterClosed().pipe(
      filter(shouldDelete => shouldDelete),
      flatMap(() => this.householdService.deleteById(household.id))
    ).subscribe(household => {
      this.snackbar.open('Deleted ' + household.name, 'Dismiss', {duration: 1000});
    });
  }

}
