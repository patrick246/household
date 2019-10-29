package de.patrick246.household.inventory.api;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class ResponseContainer<T> {
    private List<T> data;
    private int page;
    private int size;
    private long total;
}
