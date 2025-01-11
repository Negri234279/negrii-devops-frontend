import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CharactersComponent } from './characters.component'
import { CharactersService } from '../libs/services/characters-api.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('CharactersComponent', () => {
    let component: CharactersComponent
    let fixture: ComponentFixture<CharactersComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CharactersComponent, HttpClientTestingModule],
            providers: [CharactersService],
        }).compileComponents()

        fixture = TestBed.createComponent(CharactersComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
