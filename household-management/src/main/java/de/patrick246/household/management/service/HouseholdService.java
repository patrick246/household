package de.patrick246.household.management.service;

import de.patrick246.household.management.model.HouseholdModel;
import de.patrick246.household.management.model.HouseholdRole;
import de.patrick246.household.management.repository.HouseholdRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class HouseholdService {
    private final HouseholdRepository repository;
    private final KeycloakReconciliation keycloakReconciliation;

    public HouseholdModel createHousehold(HouseholdModel model, Principal principal) {
        String username = getUsername(principal);
        model.getRoleMappings().put(username, HouseholdRole.OWNER);
        HouseholdModel saved = repository.save(model);
        keycloakReconciliation.reconciliation(saved);
        return saved;
    }

    public Page<HouseholdModel> getPaginatedHouseholds(int page, int size, Principal principal) {
        String username = getUsername(principal);
        return repository.findHouseholdModelsForUser(username, PageRequest.of(page, size));
    }

    public Optional<HouseholdModel> findById(String id, Principal principal) {
        return repository.findById(id)
                .filter(householdModel -> householdModel.getRoleMappings().containsKey(getUsername(principal)));
    }

    public Optional<HouseholdModel> update(HouseholdModel model, Principal principal) {
        String username = getUsername(principal);
        Optional<HouseholdModel> optional = repository.findById(model.getId())
                .filter(household -> household.getRoleMappings().get(username) == HouseholdRole.OWNER)
                .map(h -> model)
                .map(repository::save);
        optional.ifPresent(keycloakReconciliation::reconciliation);
        return optional;
    }

    public Optional<HouseholdModel> delete(String id, Principal principal) {
        String username = getUsername(principal);
        return repository.findById(id)
                .filter(household -> household.getRoleMappings().get(username) == HouseholdRole.OWNER)
                .map(household -> {
                    repository.delete(household);
                    return household;
                });
    }

    private String getUsername(Principal principal) {
        return ((JwtAuthenticationToken) principal).getToken().getClaimAsString("preferred_username");
    }
}
