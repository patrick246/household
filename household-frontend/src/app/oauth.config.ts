import {AuthConfig} from "angular-oauth2-oidc";

export const oAuthConfig: AuthConfig = {
  clientId: 'household-frontend-dev',
  redirectUri: 'http://localhost:4200',
  issuer: 'http://localhost:8180/auth/realms/household',
  scope: 'openid profile email offline_access',
  responseType: 'code',
  disableAtHashCheck: true
};
