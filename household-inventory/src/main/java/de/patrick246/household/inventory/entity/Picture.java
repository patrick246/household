package de.patrick246.household.inventory.entity;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Value
@With
@Builder
public class Picture {
    @Id
    @With(AccessLevel.NONE)
    private ObjectId id;
    @NonNull
    private String name;
    @NonNull
    private byte[] data;
}
