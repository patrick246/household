package de.patrick246.household.inventory.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Value
@With
@AllArgsConstructor(onConstructor_ = @JsonCreator)
@Builder
public class Item {
    @Id
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

    private String description;
}
