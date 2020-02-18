import {AuthConfig} from "angular-oauth2-oidc";
import {environment} from "../environments/environment";

export const oAuthConfig: AuthConfig = {
  clientId: environment.oidc.client_id,
  redirectUri: environment.oidc.redirect_uri,
  issuer: environment.oidc.issuer,
  scope: 'openid profile email offline_access',
  responseType: 'code',
  disableAtHashCheck: true
};
