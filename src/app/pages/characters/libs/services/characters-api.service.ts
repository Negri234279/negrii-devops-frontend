import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import {
    Character,
    CharacterFilters,
    CharacterLocation,
    CharactersResponse,
    Gender,
    Species,
    Status,
} from '../@types/character'
import { CharactersService } from '../characters.service'

@Injectable({
    providedIn: 'root',
})
export class CharactersServiceApiImpl implements CharactersService {
    private readonly http = inject(HttpClient)

    private readonly url = 'https://rickandmortyapi.com/api/character'

    find(filters?: Partial<CharacterFilters>): Observable<CharactersResponse> {
        const url = new URL(this.url)

        for (const [key, value] of Object.entries(filters || {})) {
            if (value) {
                url.searchParams.append(key, value.toString())
            }
        }

        return this.http.get<CharactersResponseApi>(url.href).pipe(
            map(({ info, results }) => {
                const { next, prev } = info

                const items: Character[] = results.map(({ image, ...character }) => ({
                    ...character,
                    avatar: image.split('/').pop() || image,
                }))

                return {
                    total: info.count,
                    items,
                    next: next ? parseInt(next) : null,
                    prev: prev ? parseInt(prev) : null,
                }
            })
        )
    }

    avatar(characterImage: Character['avatar']): string {
        return `${this.url}/avatar/${characterImage}`
    }
}

interface CharactersResponseApi {
    info: CharactersResponseApiInfo
    results: CharacterApi[]
}

interface CharactersResponseApiInfo {
    count: number
    pages: number
    next: string | null
    prev: string | null
}

interface CharacterApi {
    id: number
    name: string
    status: Status
    species: Species
    type: string
    gender: Gender
    origin: CharacterLocation
    location: CharacterLocation
    image: string
    episode: string[]
    url: string
    created: Date
}
