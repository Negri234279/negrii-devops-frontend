import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'

import { NotFoundComponent } from './not-found.component'

describe('NotFoundComponent', () => {
    let component: NotFoundComponent
    let fixture: ComponentFixture<NotFoundComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NotFoundComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({}),
                        queryParams: of({}),
                    },
                },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(NotFoundComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
