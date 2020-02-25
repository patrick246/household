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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URLConnection;
import java.util.Optional;

@RestController
@RequestMapping("{household}/items")
@RequiredArgsConstructor
@Slf4j
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    @PreAuthorize("hasAnyRole(#household + '-owner', #household + '-member')")
    public ResponseContainer<Item> getItems(
            @PathVariable("household") String household,
            @RequestParam @Valid @Min(0) int page,
            @RequestParam @Valid @Max(200) @Min(0) int size,
            @RequestParam(required = false) @Valid String search
    ) {
        Page<Item> items = Optional.ofNullable(search)
                .map(searchValue -> itemService.findItemsByName(household, page, size, searchValue))
                .orElse(itemService.getItemsPaginated(household, page, size));

        return ResponseContainer.<Item>builder()
                .page(page)
                .size(size)
                .total(items.getTotalElements())
                .data(items.getContent())
                .build();
    }

    @GetMapping("id/{id}")
    @PreAuthorize("hasAnyRole(#household + '-owner', #household + '-member')")
    public Item getItemById(
            @PathVariable String household,
            @PathVariable String id
    ) {
        var objectId = new ObjectId(id);
        return itemService.findById(household, objectId).orElseThrow(() -> new ResourceNotFoundException("item", id));
    }

    @GetMapping(value = "id/{id}/image")
    @PreAuthorize("hasAnyRole(#household + '-owner', #household + '-member')")
    public byte[] getImageOfItem(
            @PathVariable String household,
            @PathVariable String id,
            HttpServletResponse response
    ) {
        var objectId = new ObjectId(id);
        Picture picture = itemService.findPictureById(household, objectId)
                .orElseThrow(() -> new ResourceNotFoundException("picture", id));
        response.setContentType(getMIMEType(picture.getData()));
        return picture.getData();
    }

    private String getMIMEType(byte[] data) {
        try {
            String guessedMIMEType = URLConnection.guessContentTypeFromStream(new ByteArrayInputStream(data));
            if (guessedMIMEType == null || !guessedMIMEType.startsWith("image/")) {
                return "application/octet-stream";
            }
            return guessedMIMEType;
        } catch (IOException e) {
            log.warn("Error guessing image content");
            return "application/octet-stream";
        }
    }

    @PostMapping("id/{id}/image")
    @PreAuthorize("hasAnyRole(#household + '-owner', #household + '-member')")
    public void uploadImage(
            @PathVariable String household,
            @PathVariable ObjectId id,
            @RequestParam MultipartFile image
    ) {
        try {
            itemService.uploadFile(household, id, image.getOriginalFilename(), image.getBytes());
        } catch (IOException e) {
            log.error("IOException while uploading image", e);
        }
    }

    @PostMapping
    @PreAuthorize("hasAnyRole(#household + '-owner', #household + '-member')")
    public Item createItem(
            @PathVariable String household,
            @RequestBody @Valid NewItemContainer newItem
    ) {
        return itemService.createItem(household, newItem);
    }

    @PutMapping("id/{id}")
    @PreAuthorize("hasAnyRole(#household + '-owner', #household + '-member')")
    public Item modifyItem(
            @PathVariable String household,
            @PathVariable ObjectId id,
            @RequestBody @Valid NewItemContainer modifiedItem
    ) {
        return itemService.modifyItem(household, id, modifiedItem);
    }

    @DeleteMapping("id/{id}")
    @PreAuthorize("hasAnyRole(#household + '-owner', #household + '-member')")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteItem(
            @PathVariable String household,
            @PathVariable ObjectId id
    ) {
        itemService.deleteItem(household, id);
    }

}
