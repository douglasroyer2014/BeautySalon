import { Routes } from '@angular/router';
import { PersonListComponent } from './person-list-component/person-list-component';
import { Home } from './home/home';
import { PersonFormComponent } from './person-list-component/person-form-component/person-form-component';

export const routes: Routes = [
    { path: '', component: Home },
    {
        path: 'person',
        children: [
            { path: '', component: PersonListComponent },
            { path: 'new', component: PersonFormComponent },
            { path: ':id/edit', component: PersonFormComponent }
        ]
    }
];
