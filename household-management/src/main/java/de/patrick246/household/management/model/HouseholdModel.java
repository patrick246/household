package de.patrick246.household.management.model;

import lombok.NonNull;
import lombok.Value;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.Nullable;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.Map;

@Value
@Document
@Valid
@With
public class HouseholdModel {
    @Id
    @Nullable
    private String id;
    @NonNull
    @Size(min = 3, max = 50)
    private String name;
    @Nullable
    @Size(min = 3, max = 200)
    private String description;
    @Nullable
    private GeoJsonPoint location;
    @NonNull
    private Map<String, HouseholdRole> roleMappings;
}

