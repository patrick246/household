import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {filter, map, shareReplay, tap} from 'rxjs/operators';
import {OAuthEvent, OAuthService} from "angular-oauth2-oidc";
import {IdToken} from "../api/IdToken.model";

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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authentication: OAuthService
  ) {
  }

  ngOnInit(): void {
    this.authentication.events.pipe(
      filter(event => event instanceof OAuthEvent),
      filter(event => event.type === 'token_refreshed'),
      map(() => this.authentication.getIdentityClaims()),
      tap(claims => console.log('Id token claims', claims))
    ).subscribe(claims => this.user = claims as IdToken);
  }

  openAccountPage() {
    window.open(this.user.iss + '/account', 'household-account-settings');
  }

  logout() {
    this.authentication.logOut();
  }
}
