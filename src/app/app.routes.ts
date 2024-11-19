import { Routes } from '@angular/router'

import { CharactersComponent } from './pages/characters/characters/characters.component'
import { HomeComponent } from './pages/home/home.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { CharacterComponent } from './pages/characters/[id]/character/character.component'

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
        path: 'characters/:id',
        component: CharacterComponent,
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
