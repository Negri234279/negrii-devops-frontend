import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { CharactersService } from './characters.service'

describe('CharactersService', () => {
    let service: CharactersService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CharactersService],
            imports: [HttpClientTestingModule],
        })
        service = TestBed.inject(CharactersService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should have a find method', () => {
        expect(service.find).toBeDefined()
    })
})
