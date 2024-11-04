import { inject, Injectable } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs/operators'

@Injectable({
    providedIn: 'root',
})
export class TitleService {
    private readonly router = inject(Router)
    private readonly titleService = inject(Title)

    init(): void {
        this.router.events.pipe(filter((ev) => ev instanceof NavigationEnd)).subscribe(() => {
            const routeDataTitle = this.router.routerState.snapshot.root.firstChild?.data?.['title']
            const title = routeDataTitle ? `Rick and Morty - ${routeDataTitle}` : 'Rick and Morty'

            this.titleService.setTitle(title)
        })
    }
}
