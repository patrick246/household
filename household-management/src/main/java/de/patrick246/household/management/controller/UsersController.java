package de.patrick246.household.management.controller;

import de.patrick246.household.management.controller.exception.InvalidRequestException;
import de.patrick246.household.management.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UsersController {

    private final UsersService usersService;

    @GetMapping
    public List<String> findUsersByName(
            @RequestParam String name
    ) {
        if (name.length() < 3) {
            throw new InvalidRequestException("Query parameter name must be at least 3 characters long");
        }

        return usersService.findUsersByName(name);
    }
}
