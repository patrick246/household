package de.patrick246.household.management.service;

import de.patrick246.household.management.model.HouseholdModel;
import de.patrick246.household.management.model.HouseholdRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RoleResource;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Component;

import javax.ws.rs.NotFoundException;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class KeycloakReconciliation {
    private final RealmResource realm;

    public void reconciliation(HouseholdModel household) {
        String householdClientId = getHouseholdClientUUID();
        RoleResource owner = ensureRoleExists(householdClientId, household.getId() + HouseholdRole.OWNER.toSuffix(), household.getName());
        RoleResource member = ensureRoleExists(householdClientId, household.getId() + HouseholdRole.MEMBER.toSuffix(), household.getName());

        household.getRoleMappings()
                .forEach((key, value) -> ensureUserIsMemberOfRole(householdClientId, key, value == HouseholdRole.OWNER ? owner : member));

        owner.getRoleUserMembers()
                .forEach(user -> ensureUserIsAuthorized(user, owner, household, HouseholdRole.OWNER, householdClientId));

        member.getRoleUserMembers()
                .forEach(user -> ensureUserIsAuthorized(user, member, household, HouseholdRole.MEMBER, householdClientId));
    }

    private void ensureUserIsAuthorized(UserRepresentation user, RoleResource roleResource, HouseholdModel householdModel, HouseholdRole role, String householdId) {
        Map<String, HouseholdRole> roleMapping = householdModel.getRoleMappings();
        if (!roleMapping.containsKey(user.getUsername()) || !roleMapping.get(user.getUsername()).equals(role)) {
            realm.users()
                    .get(user.getId())
                    .roles()
                    .clientLevel(householdId)
                    .remove(Collections.singletonList(roleResource.toRepresentation()));
        }
    }

    private String getHouseholdClientUUID() {
        return realm.clients()
                .findByClientId("household")
                .stream()
                .findAny()
                .orElseThrow(() -> new RuntimeException("household client not present"))
                .getId();
    }

    private RoleResource ensureRoleExists(String householdClientId, String role, String name) {
        RoleResource roleResource = realm.clients().get(householdClientId).roles().get(role);
        try {
            roleResource.toRepresentation();
        } catch (NotFoundException e) {
            log.info("Creating role {}", role);
            realm.clients()
                    .get(householdClientId)
                    .roles()
                    .create(new RoleRepresentation(role, "Household Role for " + name, false));
            roleResource = realm.clients().get(householdClientId).roles().get(role);
            roleResource.toRepresentation();
        }
        return roleResource;
    }

    private void ensureUserIsMemberOfRole(String householdClientId, String username, RoleResource role) {
        Optional<UserRepresentation> userOptional = realm.users().search(username).stream().findAny();
        if (userOptional.isEmpty()) {
            log.warn("Could not get user {}", username);
            return;
        }

        String userId = userOptional.get().getId();

        boolean isMember = role.getRoleUserMembers()
                .stream()
                .anyMatch(member -> member.getUsername().equals(username));

        if (isMember) {
            return;
        }

        log.info("Adding user {} to role {}", username, role.toRepresentation().getName());
        realm.users()
                .get(userId)
                .roles()
                .clientLevel(householdClientId)
                .add(Collections.singletonList(role.toRepresentation()));
    }
}
