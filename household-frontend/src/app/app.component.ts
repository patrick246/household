import {Component} from '@angular/core';
import {NullValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {oAuthConfig} from "./oauth.config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'household-frontend';

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(oAuthConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        if (!this.oauthService.hasValidAccessToken()) {
          this.oauthService.initCodeFlow();
        }
      })
      .catch(err => console.error(err));
  }
}
