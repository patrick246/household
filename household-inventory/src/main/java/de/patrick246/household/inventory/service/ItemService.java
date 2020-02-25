package de.patrick246.household.inventory.service;

import de.patrick246.household.inventory.api.NewItemContainer;
import de.patrick246.household.inventory.api.ResourceNotFoundException;
import de.patrick246.household.inventory.entity.Item;
import de.patrick246.household.inventory.entity.Picture;
import de.patrick246.household.inventory.repository.ItemRepository;
import de.patrick246.household.inventory.repository.PictureRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final PictureRepository pictureRepository;

    public Page<Item> getItemsPaginated(String household, int page, int size) {
        return itemRepository.findItemsByHousehold(household, PageRequest.of(page, size, Sort.by("name")));
    }

    public Page<Item> findItemsByName(String household, int page, int size, String name) {
        return itemRepository.findItemByHouseholdAndNameContainingIgnoreCase(household, name, PageRequest.of(page, size, Sort.by("name")));
    }

    public Optional<Item> findById(String household, ObjectId id) {
        return itemRepository.findByHouseholdAndId(household, id);
    }

    public Optional<Picture> findPictureById(String household, ObjectId id) {
        if (itemRepository.existsByHouseholdAndId(household, id)) {
            return pictureRepository.findById(id);
        }
        return Optional.empty();
    }

    public Item createItem(String household, NewItemContainer newItem) {
        var item = Item.builder()
                .household(household)
                .name(newItem.getName())
                .location(newItem.getLocation())
                .count(newItem.getCount() != null ? newItem.getCount() : 0)
                .barcode(newItem.getBarcode())
                .target(newItem.getTarget())
                .value(newItem.getValue())
                .description(newItem.getDescription())
                .build();

        return itemRepository.save(item);
    }

    public Item modifyItem(String household, ObjectId id, NewItemContainer modifiedItem) {
        return itemRepository.findByHouseholdAndId(household, id)
                .map(item -> item
                        .withName(modifiedItem.getName())
                        .withLocation(modifiedItem.getLocation())
                        .withCount(modifiedItem.getCount() != null ? modifiedItem.getCount() : 0)
                        .withBarcode(modifiedItem.getBarcode())
                        .withTarget(modifiedItem.getTarget())
                        .withValue(modifiedItem.getValue())
                        .withDescription(modifiedItem.getDescription())
                )
                .map(itemRepository::save)
                .orElseThrow(() -> new ResourceNotFoundException("item", id.toString()));
    }

    public void deleteItem(String household, ObjectId id) {
        itemRepository.deleteByHouseholdAndId(household, id);
    }

    public void uploadFile(String household, ObjectId id, String name, byte[] content) {
        if (!itemRepository.existsByHouseholdAndId(household, id)) {
            throw new ResourceNotFoundException("item", id.toString());
        }

        Picture picture = Picture.builder()
                .id(id)
                .name(name)
                .data(content)
                .build();
        pictureRepository.save(picture);
    }

}
