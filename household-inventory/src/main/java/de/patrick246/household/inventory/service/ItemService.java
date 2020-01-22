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

    public Page<Item> getItemsPaginated(int page, int size) {
        return itemRepository.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    public Page<Item> findItemsByName(int page, int size, String name) {
        return itemRepository.findItemByNameContainingIgnoreCase(name, PageRequest.of(page, size));
    }

    public Optional<Item> findById(ObjectId id) {
        return itemRepository.findById(id);
    }

    public Optional<Picture> findPictureById(ObjectId id) {
        return pictureRepository.findById(id);
    }

    public Item createItem(NewItemContainer newItem) {
        var item = Item.builder()
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

    public Item modifyItem(ObjectId id, NewItemContainer modifiedItem) {
        return itemRepository.findById(id)
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

    public void deleteItem(ObjectId id) {
        itemRepository.deleteById(id);
    }

    public void uploadFile(ObjectId id, String name, byte[] content) {
        if (!itemRepository.existsById(id)) {
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
