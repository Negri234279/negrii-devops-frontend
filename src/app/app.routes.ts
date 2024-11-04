import { Routes } from '@angular/router'

import { CharactersComponent } from './pages/characters/characters/characters.component'
import { HomeComponent } from './pages/home/home.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'characters',
        component: CharactersComponent,
        data: {
            title: 'Characters',
        },
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
    },
    {
        path: '**',
        redirectTo: '/not-found',
    },
]
