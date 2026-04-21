package com.ie.beautysalon.Person.controller;

import com.ie.beautysalon.Person.dto.PersonDTO;
import com.ie.beautysalon.Person.entity.PersonEntity;
import com.ie.beautysalon.Person.service.PersonService;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("person")
@CrossOrigin("*")
@Setter(onMethod_ = @Autowired)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PersonController {

    PersonService personService;

    @GetMapping
    public ResponseEntity<List<PersonEntity>> getAllPerson() {
        return ResponseEntity.ok(personService.getAllPerson());
    }

    @GetMapping("{id}")
    public ResponseEntity<PersonEntity> getPersonById(@PathVariable UUID id) {
        Optional<PersonEntity> personEntity = personService.getPersonById(id);
        return personEntity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }


    @PostMapping
    public ResponseEntity<PersonEntity> createPerson(@RequestBody @NotNull PersonDTO personDTO) {
        PersonEntity personEntity = personService.createPersonEntity(personDTO);

        URI location = URI.create("/person" + personEntity.getId());

        return ResponseEntity
                .created(location)
                .body(personEntity);
    }

    @PutMapping("{id}")
    public ResponseEntity<String> updatePerson(@PathVariable("id") UUID id, @RequestBody @NotNull PersonDTO personDTO) {
        return ResponseEntity.ok(personService.updatePerson(id, personDTO));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deletePerson(@PathVariable("id") UUID id) {
        personService.deletePerson(id);
        return ResponseEntity.ok("deleted successfully!");
    }

}
