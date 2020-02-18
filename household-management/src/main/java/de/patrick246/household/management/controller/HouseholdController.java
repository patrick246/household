package de.patrick246.household.management.controller;

import de.patrick246.household.management.controller.exception.NotFoundException;
import de.patrick246.household.management.model.HouseholdModel;
import de.patrick246.household.management.model.ResponseContainer;
import de.patrick246.household.management.service.HouseholdService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("household")
@RequiredArgsConstructor
public class HouseholdController {

    private final HouseholdService householdService;

    @GetMapping
    public ResponseContainer<HouseholdModel> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size,
            @AuthenticationPrincipal Principal principal
    ) {
        Page<HouseholdModel> pageResult = householdService.getPaginatedHouseholds(page, size, principal);
        return ResponseContainer.fromPage(pageResult);
    }

    @GetMapping("{id}")
    public HouseholdModel getSingle(
            @PathVariable String id,
            @AuthenticationPrincipal Principal principal
    ) {
        return householdService.findById(id, principal)
                .orElseThrow(() -> new NotFoundException("Could not find household"));

    }

    @PostMapping
    public HouseholdModel create(
            @RequestBody HouseholdModel model,
            @AuthenticationPrincipal Principal principal
    ) {
        if (model.getId() != null) {
            throw new IllegalArgumentException("model.id should not be set when creating");
        }

        return householdService.createHousehold(model, principal);
    }

    @PutMapping("{id}")
    public HouseholdModel update(
            @PathVariable String id,
            @RequestBody HouseholdModel modelParam,
            @AuthenticationPrincipal Principal principal
    ) {
        HouseholdModel model = modelParam.withId(id);
        return householdService.update(model, principal).orElseThrow(() -> new NotFoundException("Could not find household"));
    }

    @DeleteMapping("{id}")
    public HouseholdModel delete(
            @PathVariable String id,
            @AuthenticationPrincipal Principal principal
    ) {
        return householdService.delete(id, principal)
                .orElseThrow(() -> new NotFoundException("Could not find household"));
    }

}
