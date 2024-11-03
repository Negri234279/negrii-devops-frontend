import { Routes } from '@angular/router'
import { CharactersComponent } from './pages/characters/characters.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'

export const routes: Routes = [
    {
        path: 'characters',
        component: CharactersComponent,
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
