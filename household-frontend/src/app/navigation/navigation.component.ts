import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {merge, Observable, of} from 'rxjs';
import {filter, map, shareReplay, tap} from 'rxjs/operators';
import {OAuthEvent, OAuthService} from "angular-oauth2-oidc";
import {IdToken} from "../api/IdToken.model";
import {MatSidenav} from "@angular/material/sidenav";
import {Household} from "../household-management/service/household.model";
import {HouseholdContextService} from "../household-management/context/household-context.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public user: IdToken;
  public household$: Observable<Household>;

  @ViewChild('drawer')
  private drawer: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authentication: OAuthService,
    private householdContext: HouseholdContextService
  ) {
    this.household$ = this.householdContext.household$;
  }

  ngOnInit(): void {
    merge(
      of(this.authentication.getIdentityClaims()),
      this.authentication.events.pipe(
        filter(event => event instanceof OAuthEvent),
        filter(event => event.type === 'token_refreshed'),
        map(() => this.authentication.getIdentityClaims())
      )
    ).pipe(
      filter(claims => claims != null),
      tap(claims => console.log('Id token claims', claims))
    ).subscribe(claims => this.user = claims as IdToken);
  }

  closeDrawer() {
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      this.drawer.close();
    }
  }

  openAccountPage() {
    window.open(this.user.iss + '/account', 'household-account-settings');
  }

  logout() {
    this.authentication.logOut();
  }
}
