package de.patrick246.household.inventory.repository;

import de.patrick246.household.inventory.entity.Picture;
import org.bson.types.ObjectId;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PictureRepository extends PagingAndSortingRepository<Picture, ObjectId> {
}
