export interface IdTokenClaims {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  auth_time?: number;
  nonce?: string;
  azp?: string;
  acr?: string;
}

export interface KeycloakClaims {
  family_name: string;
  given_name: string;
  name: string;
  preferred_username: string;
  email: string;
}

export type IdToken = IdTokenClaims & KeycloakClaims;
