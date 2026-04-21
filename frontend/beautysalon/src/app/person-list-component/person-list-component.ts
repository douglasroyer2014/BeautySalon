import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Person } from '../models/person/PersonModel';
import { HairColor } from '../models/enums/HairColorEnum';
import { HairLength } from '../models/enums/HairLengthEnum';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { PersonService } from '../models/person/PersonService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-person-list-component',
  imports: [SlicePipe, AsyncPipe],
  templateUrl: './person-list-component.html',
  styleUrl: './person-list-component.css',
})
export class PersonListComponent implements OnInit {
  personList$!: Observable<Person[]>;
  selectedIds = new Set<string>();
  HairColor = HairColor;
  hairLength = HairLength;

  constructor(private personService: PersonService, private router: Router) { }

  toggleSelection(person: Person, checked: boolean) {
    if (checked) {
      this.selectedIds.add(person.id);
    } else {
      this.selectedIds.delete(person.id);
    }
  }

  hasSelectionEdit(): boolean {
    return this.selectedIds.size > 0 && this.selectedIds.size <= 1;
  }

  hasSelectionDelete(): boolean {
    return this.selectedIds.size > 0;
  }

  ngOnInit(): void {
    this.personList$ = this.personService.getAll();
  }

  goToNewPage() {
    this.router.navigate(['/person/new']);
  }

  goToEditPage() {
    this.router.navigate(['/person/' + Array.from(this.selectedIds)[0] + '/edit']);
  }

  getHairColorLabel(color: string): string {
    return HairColor[color as keyof typeof HairColor] ?? color;
  }

  getHairLegthLabel(length: string): string {
    return HairLength[length as keyof typeof HairLength] ?? length;
  }

  deleteAllSelected() {
    for (let ids of this.selectedIds) {
      this.personService.delete(ids);
      this.deleteFromList(ids)
    }
    this.selectedIds.clear();
    console.log(this.personList$);
  }

  deleteFromList(id: string) {
    this.personList$ = this.personList$.pipe(
      map(list => list.filter(p => p.id !== id))
    );
  }
}
