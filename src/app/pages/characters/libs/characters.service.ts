import { Observable } from 'rxjs'
import { Character, CharacterFilters, CharactersResponse } from './@types/character'

export abstract class CharactersService {
    abstract find(filters?: Partial<CharacterFilters>): Observable<CharactersResponse>
    abstract avatar(characterImage: Character['avatar']): string
}
