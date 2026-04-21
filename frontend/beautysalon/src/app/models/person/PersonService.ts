import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Person } from "./PersonModel";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<Person[]> {
        return this.http.get<Person[]>('http://localhost:8080/person');
    }

    getById(id: string): Observable<Person> {
        return this.http.get<Person>(`http://localhost:8080/person/${id}`);
    }

    save(person: Person) {
        return this.http.post('http://localhost:8080/person', person);
    }

    edit(id: string, person: Person) {
        this.http.put(`http://localhost:8080/person/${id}`, person, { responseType: 'text' })
            .subscribe(result => {
                console.log('Create!')
            });;
    }

    delete(id: string) {
        this.http.delete(`http://localhost:8080/person/${id}`, { responseType: 'text' }).subscribe({
            next: () => {
                console.log('Deleted successfully');
            },
            error: (err) => {
                console.error('Delete failed', err);
            }
        });;
    }
}