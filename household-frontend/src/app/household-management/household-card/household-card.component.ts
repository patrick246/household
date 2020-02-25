import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Household} from "../service/household.model";
import {Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, flatMap, tap} from "rxjs/operators";
import {HouseholdManagementService} from "../service/household-management.service";
import {OAuthService} from "angular-oauth2-oidc";
import {IdToken} from "../../api/IdToken.model";

@Component({
  selector: 'app-household-card',
  templateUrl: './household-card.component.html',
  styleUrls: ['./household-card.component.scss']
})
export class HouseholdCardComponent implements OnInit {

  @Input()
  public household: Household;

  @Output()
  public selected: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public deleted: EventEmitter<void> = new EventEmitter<void>();

  public edit: boolean = false;
  public editHousehold: Household;
  public userSearch: string = "";
  public currentUser: string = '';

  public userSearchInput: Subject<string> = new Subject<string>();
  public userSearchResult$: Observable<string[]> = this.userSearchInput.pipe(
    tap(term => console.log(term)),
    debounceTime(200),
    distinctUntilChanged(),
    filter(searchTerm => searchTerm.length >= 3),
    flatMap(searchTerm => this.managementService.searchUsers(searchTerm)),
  );


  constructor(
    private managementService: HouseholdManagementService,
    private authentication: OAuthService,
  ) {
  }

  ngOnInit() {
    this.currentUser = (this.authentication.getIdentityClaims() as IdToken).preferred_username;
  }

  enterEditMode() {
    this.editHousehold = {
      ...this.household
    };
    this.edit = true;
  }

  cancelEditing() {
    this.edit = false;
    this.editHousehold = null;
  }

  save() {
    this.managementService.save(this.editHousehold).subscribe(() => {
      this.edit = false;
      this.editHousehold = null;
    });
  }

  addUser(username: string) {
    if (username.length < 3) {
      return;
    }
    if (!(username in this.editHousehold.roleMappings)) {
      this.editHousehold.roleMappings[username] = 'MEMBER';
    }
    this.userSearch = '';
  }

  deleteRole(username: string) {
    delete this.editHousehold.roleMappings[username];
  }

}
