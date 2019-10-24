package de.patrick246.household.inventory.api;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.Value;
import org.springframework.lang.Nullable;

@Value
@AllArgsConstructor(onConstructor_ = @JsonCreator)
public class NewItemContainer {
    @NonNull
    private String name;
    @NonNull
    private String location;
    @Nullable
    private Integer count;
    @Nullable
    private Integer target;
    @Nullable
    private Integer value;
    @Nullable
    private String barcode;
}
