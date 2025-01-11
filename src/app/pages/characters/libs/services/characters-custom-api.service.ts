import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Character, CharacterFilters, CharactersResponse } from '../@types/character'
import { CharactersService } from '../characters.service'

@Injectable({
    providedIn: 'root',
})
export class CharactersServiceCustomApiImpl implements CharactersService {
    private readonly http = inject(HttpClient)

    private readonly url = 'http://127.0.0.1:3000/api/v1/characters'

    find(filters?: Partial<CharacterFilters>): Observable<CharactersResponse> {
        const url = new URL(this.url)

        for (const [key, value] of Object.entries(filters || {})) {
            if (value) {
                url.searchParams.append(key, value.toString())
            }
        }

        return this.http.get<CharactersResponseApi>(url.href)
    }

    avatar(characterImage: Character['avatar']): string {
        return `${this.url}/avatar/${characterImage}`
    }
}

interface CharactersResponseApi {
    items: Character[]
    total: number
    next: number | null
    prev: number | null
}
