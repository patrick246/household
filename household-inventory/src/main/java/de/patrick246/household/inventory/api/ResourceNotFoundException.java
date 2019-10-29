package de.patrick246.household.inventory.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String type, String id) {
        super("Ressource " + type + " with id " + (id != null ? id : "[null]") + " not found");
    }
}
