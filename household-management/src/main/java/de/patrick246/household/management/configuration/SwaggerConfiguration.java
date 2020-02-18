package de.patrick246.household.management.configuration;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.time.LocalDate;
import java.util.Collections;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    private String issuer;

    public SwaggerConfiguration(
            @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}") String issuer
    ) {
        this.issuer = issuer;
    }

    @Bean
    public Docket swagger() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .pathMapping("/")
                .directModelSubstitute(LocalDate.class, String.class)
                .directModelSubstitute(ObjectId.class, String.class)
                .genericModelSubstitutes(ResponseEntity.class)
                .securitySchemes(Collections.singletonList(
                        new OAuth("OpenID Connect Keycloak", Collections.emptyList(), Collections.singletonList(
                                new AuthorizationCodeGrant(
                                        new TokenRequestEndpoint(issuer + "/protocol/openid-connect/auth", "client_id", "client_secret"),
                                        new TokenEndpoint(issuer + "/protocol/openid-connect/token", "access_token")
                                )
                        ))
                )).securityContexts(Collections.singletonList(
                        SecurityContext.builder()
                                .forPaths(PathSelectors.any())
                                .securityReferences(Collections.singletonList(SecurityReference.builder()
                                        .reference("OpenID Connect Keycloak")
                                        .scopes(new AuthorizationScope[0])
                                        .build()))
                                .build()
                ));
    }
}
