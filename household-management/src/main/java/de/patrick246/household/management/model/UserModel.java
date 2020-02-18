package de.patrick246.household.management.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Value;

@Value
@AllArgsConstructor(onConstructor_ = @JsonCreator)
public class UserModel {
    private String username;
    private String firstName;
    private String lastName;
    private String idpId;
}
