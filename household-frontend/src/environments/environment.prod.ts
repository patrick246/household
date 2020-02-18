export const environment = {
  production: true,
  backends: {
    inventory: '/api/inventory'
  },
  oidc: {
    client_id: 'household',
    issuer: 'https://sso.k8s.patrick246.de/auth/realms/patrick246',
    redirect_uri: 'https://household.k8s.patrick246.de/'
  }
};
