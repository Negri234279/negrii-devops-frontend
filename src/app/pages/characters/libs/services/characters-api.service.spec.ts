import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { CharactersServiceApiImpl } from './characters-api.service'

describe('CharactersService', () => {
    let service: CharactersServiceApiImpl

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CharactersServiceApiImpl],
            imports: [HttpClientTestingModule],
        })
        service = TestBed.inject(CharactersServiceApiImpl)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should have a find method', () => {
        expect(service.find).toBeDefined()
    })
})
