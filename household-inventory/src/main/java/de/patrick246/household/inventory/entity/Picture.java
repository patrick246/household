package de.patrick246.household.inventory.entity;

import lombok.NonNull;
import lombok.Value;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Value
public class Picture {
    @Id
    private ObjectId id;
    @NonNull
    private String name;
    @NonNull
    private byte[] data;
}
