package de.patrick246.household.inventory.entity;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Value
@With
@AllArgsConstructor
@Builder
public class Item {
    @Id
    @With(value = AccessLevel.NONE)
    private ObjectId id;
    @Indexed
    private String barcode;
    @NonNull
    @Indexed
    private String name;
    @NonNull
    private String location;
    @NonNull
    private int count;

    private Integer target;
    private Integer value;
    private byte[] picture;
}
