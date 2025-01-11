import { CommonModule, isPlatformBrowser } from '@angular/common'
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { CharactersService } from '../libs/characters.service'
import { Character, CharacterFilters, CharactersResponse } from '../libs/@types/character'
import { catchError, EMPTY } from 'rxjs'

@Component({
    selector: 'app-characters',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './characters.component.html',
})
export class CharactersComponent implements OnInit {
    private readonly _charactersService = inject(CharactersService)
    private readonly platformId = inject(PLATFORM_ID)

    data = signal<CharactersResponse>({
        items: [],
        total: 0,
        next: null,
        prev: null,
    })
    filters = signal<Pick<CharacterFilters, 'page' | 'limit'>>({ page: 1, limit: 20 })

    ngOnInit(): void {
        this.loadData()
    }

    handlePageChange(page: number): void {
        this.filters.update((filters) => ({ ...filters, page }))

        this.loadData()
        this.scrollToTop()
    }

    hasNextPage(): boolean {
        return this.data()?.next !== null
    }

    handleNextPage(): void {
        this.filters.update((filters) => ({ ...filters, page: (filters.page || 0) + 1 }))

        this.loadData()
        this.scrollToTop()
    }

    hasPrevPage(): boolean {
        return this.data()?.prev !== null
    }

    handlePreviousPage(): void {
        this.filters.update((filters) => {
            const page = filters.page || 0
            return { ...filters, page: page > 1 ? page - 1 : 1 }
        })

        this.loadData()
        this.scrollToTop()
    }

    getAvatar(image: Character['avatar']): string {
        return this._charactersService.avatar(image)
    }

    private loadData(): void {
        this._charactersService
            .find(this.filters())
            .pipe(catchError(() => EMPTY))
            .subscribe((response) => {
                this.data = signal(response)
            })
    }

    private scrollToTop(): void {
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
}
