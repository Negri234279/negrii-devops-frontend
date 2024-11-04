import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class CharactersService {
    private readonly http = inject(HttpClient)

    private readonly url = 'https://rickandmortyapi.com/api/character'

    find(filters?: Partial<CharacterFilters>): Observable<CharactersResponse> {
        const url = new URL(this.url)

        for (const [key, value] of Object.entries(filters || {})) {
            if (value) {
                url.searchParams.append(key, value.toString())
            }
        }

        return this.http.get<CharactersResponse>(url.href)
    }
}

export interface CharactersResponse {
    info: CharactersResponseInfo
    results: Character[]
}

export interface CharactersResponseInfo {
    count: number
    pages: number
    next: string | null
    prev: string | null
}

export interface Character {
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

export enum Gender {
    Female = 'Female',
    Male = 'Male',
    Unknown = 'unknown',
}

export interface CharacterLocation {
    name: string
    url: string
}

export enum Species {
    Alien = 'Alien',
    Human = 'Human',
}

export enum Status {
    Alive = 'Alive',
    Dead = 'Dead',
    Unknown = 'unknown',
}

export interface CharacterFilters {
    name?: string
    status?: Status
    species?: Species
    type?: string
    gender?: Gender
    page?: number
}
