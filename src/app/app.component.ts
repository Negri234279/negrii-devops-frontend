import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { filter } from 'rxjs'
import { TitleService } from './libs/title.service'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
    providers: [TitleService],
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    private readonly router = inject(Router)
    private readonly titleService = inject(TitleService)

    isNotFound = false

    headerLinks: HeaderLink[] = [
        { url: '/characters', text: 'Characters' },
        { url: '/locations', text: 'Locations' },
        { url: '/episodes', text: 'Episodes' },
    ]

    ngOnInit(): void {
        this.router.events.pipe(filter((ev) => ev instanceof NavigationEnd)).subscribe((ev) => {
            this.isNotFound = ev.url === '/not-found' || ev.urlAfterRedirects === '/not-found'
        })

        this.titleService.init()
    }
}

interface HeaderLink {
    url: string
    text: string
}
