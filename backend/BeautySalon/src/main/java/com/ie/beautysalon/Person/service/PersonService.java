package com.ie.beautysalon.Person.service;

import com.ie.beautysalon.Person.dto.PersonDTO;
import com.ie.beautysalon.Person.entity.PersonEntity;
import com.ie.beautysalon.Person.mapper.PersonMapper;
import com.ie.beautysalon.Person.repository.PersonRepository;
import lombok.AccessLevel;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Setter(onMethod_ = @Autowired)
@FieldDefaults(level = AccessLevel.PRIVATE)

public class PersonService {

    PersonRepository personRepository;
    PersonMapper personMapper;

    public List<PersonEntity> getAllPerson() {
        return personRepository.findAll();
    }

    public Optional<PersonEntity> getPersonById(UUID id) {
        return personRepository.findById(id);
    }

    public PersonEntity createPersonEntity(PersonDTO personDTO) {
        return personRepository.save(personMapper.toEntity(personDTO));
    }

    public String updatePerson(UUID id, PersonDTO personDTO) {
        Optional<PersonEntity> personEntity = personRepository.findById(id);
        if (personEntity.isPresent()) {
            PersonEntity entityUpdate = personMapper.toEntity(personDTO);
            entityUpdate.setId(id);
            personRepository.save(entityUpdate);
            return "Update successful!";
        }
        return "Person does not exist!";
    }

    public void deletePerson(UUID id) {
        personRepository.deleteById(id);
    }
}
