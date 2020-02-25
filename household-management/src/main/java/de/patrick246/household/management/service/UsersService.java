package de.patrick246.household.management.service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.resource.RealmResource;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UsersService {

    private final RealmResource keycloakRealm;

    private final LoadingCache<String, List<String>> resultCache = CacheBuilder.newBuilder()
            .expireAfterWrite(Duration.ofMinutes(5))
            .build(CacheLoader.from(this::searchKeycloakForUsername));

    public List<String> findUsersByName(String name) {
        try {
            return resultCache.get(name);
        } catch (ExecutionException e) {
            return searchKeycloakForUsername(name);
        }
    }

    private List<String> searchKeycloakForUsername(String name) {
        return keycloakRealm.users().search(name, 0, 10)
                .stream()
                .map(keycloakUser -> keycloakUser.getUsername())
                .collect(Collectors.toList());
    }
}
