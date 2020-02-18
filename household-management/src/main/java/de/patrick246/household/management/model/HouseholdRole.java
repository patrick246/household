package de.patrick246.household.management.model;

public enum HouseholdRole {
    OWNER,
    MEMBER;

    public String toSuffix() {
        switch (this) {
            case OWNER:
                return "-owner";
            case MEMBER:
                return "-member";
        }
        throw new IllegalStateException("Missing Suffix mapping");
    }
}
