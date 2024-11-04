import { CommonModule } from '@angular/common'
import { Component, inject, OnInit, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { CharacterFilters, CharactersResponse, CharactersService } from '../libs/characters.service'

@Component({
    selector: 'app-characters',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './characters.component.html',
})
export class CharactersComponent implements OnInit {
    private readonly _charactersService = inject(CharactersService)

    data = signal<CharactersResponse>({
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
    })
    filters = signal<Partial<CharacterFilters>>({ page: 1 })

    ngOnInit(): void {
        this.loadData()
    }

    handlePageChange(page: number): void {
        this.filters.update((filters) => ({ ...filters, page }))
        this.loadData()
    }

    hasNextPage(): boolean {
        return this.data().info?.next !== null
    }

    handleNextPage(): void {
        this.filters.update((filters) => ({ ...filters, page: (filters.page || 0) + 1 }))
        this.loadData()
    }

    hasPrevPage(): boolean {
        return this.data().info?.prev !== null
    }

    handlePreviousPage(): void {
        this.filters.update((filters) => {
            const page = filters.page || 0
            return { ...filters, page: page > 1 ? page - 1 : 1 }
        })
        this.loadData()
    }

    private loadData(): void {
        this._charactersService.find(this.filters()).subscribe((response) => {
            this.data = signal(response)
        })
    }
}
