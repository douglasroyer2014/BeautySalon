package com.ie.beautysalon.Person.mapper;

import com.ie.beautysalon.Person.dto.PersonDTO;
import com.ie.beautysalon.Person.entity.PersonEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PersonMapper {

    PersonEntity toEntity(PersonDTO personDTO);
    PersonDTO toDTO(PersonEntity personEntity);
}
