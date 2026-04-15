package com.ie.beautysalon.Person.dto;

import com.ie.beautysalon.Person.enumeration.HairColor;
import com.ie.beautysalon.Person.enumeration.HairLength;
import jakarta.validation.constraints.NotBlank;

public record PersonDTO(
        @NotBlank
        String name,
        short age,
        @NotBlank
        HairColor hairColor,
        @NotBlank
        HairLength hairLength,
        String hairDescription) {
}
