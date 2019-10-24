package de.patrick246.household.inventory.api;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.Value;
import org.springframework.lang.Nullable;

import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

@Value
@AllArgsConstructor(onConstructor_ = @JsonCreator)
public class NewItemContainer {
    @NonNull
    @Size(min = 2)
    private String name;
    @NonNull
    @Size(min = 2)
    private String location;
    @Nullable
    @Min(0)
    private Integer count;
    @Nullable
    @Min(0)
    private Integer target;
    @Nullable
    @Min(0)
    private Integer value;
    @Nullable
    private String barcode;
    @Nullable
    private String description;
}
