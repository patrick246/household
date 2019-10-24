package de.patrick246.household.inventory.repository;

import de.patrick246.household.inventory.entity.Item;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ItemRepository extends PagingAndSortingRepository<Item, ObjectId> {
    Page<Item> findItemByNameContaining(String name, Pageable pageable);
}
