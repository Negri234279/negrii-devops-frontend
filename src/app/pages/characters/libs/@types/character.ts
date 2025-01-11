export interface CharactersResponse {
    items: Character[]
    total: number
    next: number | null
    prev: number | null
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
    avatar: string
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
    name: string
    status: Status
    species: Species
    type: string
    gender: Gender
    page: number
    limit: number
}
