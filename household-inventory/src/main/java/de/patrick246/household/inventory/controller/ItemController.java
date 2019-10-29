package de.patrick246.household.inventory.controller;

import de.patrick246.household.inventory.api.NewItemContainer;
import de.patrick246.household.inventory.api.ResourceNotFoundException;
import de.patrick246.household.inventory.api.ResponseContainer;
import de.patrick246.household.inventory.entity.Item;
import de.patrick246.household.inventory.entity.Picture;
import de.patrick246.household.inventory.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URLConnection;
import java.util.Optional;

@RestController
@RequestMapping("items")
@RequiredArgsConstructor
@Slf4j
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    public ResponseContainer<Item> getItems(
            @RequestParam @Valid @Min(0) int page,
            @RequestParam @Valid @Max(200) @Min(0) int size,
            @RequestParam(required = false) @Valid String search
    ) {
        Page<Item> items = Optional.ofNullable(search)
                .map(searchValue -> itemService.findItemsByName(page, size, searchValue))
                .orElse(itemService.getItemsPaginated(page, size));

        return ResponseContainer.<Item>builder()
                .page(page)
                .size(size)
                .total(items.getTotalElements())
                .data(items.getContent())
                .build();
    }

    @GetMapping("id/{id}")
    public Item getItemById(
            @PathVariable String id
    ) {
        var objectId = new ObjectId(id);
        return itemService.findById(objectId).orElseThrow(() -> new ResourceNotFoundException("item", id));
    }

    @GetMapping(value = "id/{id}/image")
    public byte[] getImageOfItem(
            @PathVariable String id,
            HttpServletResponse response
    ) {
        var objectId = new ObjectId(id);
        Picture picture = itemService.findPictureById(objectId).orElseThrow(() -> new ResourceNotFoundException("picture", id));
        response.setContentType(getMIMEType(picture.getData()));
        return picture.getData();
    }

    private String getMIMEType(byte[] data) {
        try {
            String guessedMIMEType = URLConnection.guessContentTypeFromStream(new ByteArrayInputStream(data));
            if (!guessedMIMEType.startsWith("image/")) {
                return "application/octet-stream";
            }
            return guessedMIMEType;
        } catch (IOException e) {
            log.warn("Error guessing image content");
            return "application/octet-stream";
        }
    }

    @PostMapping
    public Item createItem(
            @RequestBody @Valid NewItemContainer newItem
    ) {
        return itemService.createItem(newItem);
    }

    @PutMapping("id/{id}")
    public Item modifyItem(
            @PathVariable ObjectId id,
            @RequestBody @Valid NewItemContainer modifiedItem
    ) {
        return itemService.modifyItem(id, modifiedItem);
    }

    @DeleteMapping("id/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteItem(
            @PathVariable ObjectId id
    ) {
        itemService.deleteItem(id);
    }

}
