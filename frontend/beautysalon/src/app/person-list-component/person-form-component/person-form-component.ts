import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { HairColor } from '../../models/enums/HairColorEnum';
import { HairLength } from '../../models/enums/HairLengthEnum';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../../models/person/PersonService';

@Component({
  selector: 'app-person-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './person-form-component.html',
  styleUrl: './person-form-component.css',
})
export class PersonFormComponent implements OnInit {
  isNew: boolean = false;
  hairColors = Object.entries(HairColor).map(([key, value]) => ({ label: value, value: key }));
  hairLengths = Object.entries(HairLength).map(([key, value]) => ({ label: value, value: key }));
  form: FormGroup;
  id: string = '';

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private personService: PersonService, private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: [0, Validators.required],
      hairColor: [],
      hairLength: [],
      hairDescription: []
    });
  }

  ngOnInit(): void {
    const idRoute = this.route.snapshot.paramMap.get('id');
    if (idRoute) {
      this.personService.getById(idRoute).subscribe(data => {
        this.fillForm(data);
      })
      this.id = idRoute;
    } else {
      this.isNew = true;
    }
  }

  goToBackPage() {
    this.router.navigate(['/person']);
  }

  onSave() {
    this.personService.save(this.form.value)
      .subscribe(result => {
        console.log('Create!')
        this.form.reset();
      });
    this.goToBackPage()
  }

  onEdit() {
    this.personService.edit(this.id, this.form.value)
    this.goToBackPage();
  }

  onDelete() {
    this.personService.delete(this.id);
    this.goToBackPage();
  }

  fillForm(person: any) {
    this.form.patchValue({
      name: person.name,
      age: person.age,
      hairColor: person.hairColor,
      hairLength: person.hairLength,
      hairDescription: person.hairDescription
    })
  }

}
