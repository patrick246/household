package de.patrick246.household.inventory.repository;

import de.patrick246.household.inventory.entity.Item;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface ItemRepository extends PagingAndSortingRepository<Item, ObjectId> {
    Page<Item> findItemsByHousehold(String household, Pageable pageable);

    Page<Item> findItemByHouseholdAndNameContainingIgnoreCase(String household, String name, Pageable pageable);

    Optional<Item> findByHouseholdAndId(String household, ObjectId id);

    void deleteByHouseholdAndId(String household, ObjectId id);

    boolean existsByHouseholdAndId(String household, ObjectId id);
}
