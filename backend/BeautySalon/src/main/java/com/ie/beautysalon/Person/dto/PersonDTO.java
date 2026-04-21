package com.ie.beautysalon.Person.dto;

import com.ie.beautysalon.Person.enumeration.HairColor;
import com.ie.beautysalon.Person.enumeration.HairLength;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PersonDTO(
        @NotBlank
        String name,
        short age,
        @NotNull
        HairColor hairColor,
        @NotNull
        HairLength hairLength,
        String hairDescription) {
}
