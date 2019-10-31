package de.patrick246.household.inventory.configuration;

import com.google.common.net.HttpHeaders;
import io.swagger.models.auth.In;
import org.bson.types.ObjectId;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.time.LocalDate;
import java.util.Collections;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {
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
                .securitySchemes(Collections.singletonList(new ApiKey("OAuth2 Bearer Token", HttpHeaders.AUTHORIZATION, In.HEADER.name())));
    }
}
