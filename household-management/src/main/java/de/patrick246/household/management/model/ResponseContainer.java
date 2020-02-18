package de.patrick246.household.management.model;

import lombok.Builder;
import lombok.Value;
import org.springframework.data.domain.Page;

import java.util.List;

@Value
@Builder
public class ResponseContainer<T> {
    private List<T> data;
    private int page;
    private int size;
    private long total;

    public static <U> ResponseContainer<U> fromPage(Page<U> page) {
        return new ResponseContainer<>(page.getContent(), page.getPageable().getPageNumber(), page.getSize(), page.getTotalElements());
    }
}
