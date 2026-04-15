package com.ie.beautysalon.Person.entity;

import com.ie.beautysalon.Person.enumeration.HairColor;
import com.ie.beautysalon.Person.enumeration.HairLength;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "person")
public class PersonEntity {

    @Id
    private UUID id;
    private String name;
    private short age;
    private HairColor hairColor;
    private HairLength hairLength;
    private String hairDescription;

}
