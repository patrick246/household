import {Injectable} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {HouseholdManagementService} from "../service/household-management.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Household} from "../service/household.model";
import {flatMap, shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HouseholdContextService {
  private readonly LOCAL_STORAGE_KEY = 'household_selected';
  private selectedHousehold: string;
  private householdSubject: Subject<string> = new BehaviorSubject(localStorage.getItem(this.LOCAL_STORAGE_KEY));
  public household$: Observable<Household> = this.householdSubject.pipe(
    flatMap(id => this.households.getById(id)),
    shareReplay()
  );

  constructor(
    private authentication: OAuthService,
    private households: HouseholdManagementService
  ) {
    this.selectedHousehold = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    this.householdSubject.next(this.selectedHousehold);
  }

  public getSelectedHouseholdId(): string {
    return this.selectedHousehold;
  }

  public selectHousehold(householdId: string) {
    this.selectedHousehold = householdId;
    localStorage.setItem(this.LOCAL_STORAGE_KEY, this.selectedHousehold);
    this.householdSubject.next(householdId);
  }
}
