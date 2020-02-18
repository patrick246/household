package de.patrick246.household.management.repository;

import de.patrick246.household.management.model.HouseholdModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;

@Repository
public interface HouseholdRepository extends PagingAndSortingRepository<HouseholdModel, String> {
    @Query("{}")
    Stream<HouseholdModel> streamAll();

    @Query("{\"roleMappings.?0\": { $exists: true }}")
    Page<HouseholdModel> findHouseholdModelsForUser(String username, Pageable pageable);
}
