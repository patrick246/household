package de.patrick246.household.management.configuration;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakClientConfiguration {

    private final String keycloakUrl;
    private final String realm;
    private final String clientId;
    private final String clientSecret;

    public KeycloakClientConfiguration(
            @Value("${de.patrick246.household.management.keycloak.url}") String keycloakUrl,
            @Value("${de.patrick246.household.management.keycloak.realm}") String realm,
            @Value("${de.patrick246.household.management.keycloak.clientId}") String clientId,
            @Value("${de.patrick246.household.management.keycloak.clientSecret}") String clientSecret

    ) {
        this.keycloakUrl = keycloakUrl;
        this.realm = realm;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    @Bean
    public Keycloak keycloakAdminClient() {
        return KeycloakBuilder.builder()
                .clientId(clientId)
                .clientSecret(clientSecret)
                .serverUrl(keycloakUrl)
                .realm(realm)
                .grantType("client_credentials")
                .build();
    }

    @Bean
    public RealmResource keycloakRealm(Keycloak keycloak) {
        return keycloak.realm(realm);
    }
}
