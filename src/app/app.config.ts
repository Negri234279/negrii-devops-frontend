import { provideHttpClient, withFetch } from '@angular/common/http'
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideClientHydration } from '@angular/platform-browser'
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router'

import { routes } from './app.routes'
import { appInitializerConfigProvider } from './libs/providers/config-app.provider'
import { CharactersServiceProvider } from './pages/characters/libs/providers/characters-service.provider'

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
        provideClientHydration(),
        provideHttpClient(withFetch()),
        appInitializerConfigProvider,
        CharactersServiceProvider,
    ],
}
