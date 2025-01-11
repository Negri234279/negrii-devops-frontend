import { Injector, Provider } from '@angular/core'
import { ConfigApp } from '../../../../libs/@types/config-app'
import { ConfigService } from '../../../../libs/services/config.service'
import { CharactersService } from '../characters.service'
import { CharactersServiceApiImpl } from '../services/characters-api.service'
import { CharactersServiceCustomApiImpl } from '../services/characters-custom-api.service'

export const CharactersServiceProvider: Provider = {
    provide: CharactersService,
    useFactory: (configService: ConfigService, injector: Injector) => {
        const config = configService.getConfig()

        const servicesMap: Record<ConfigApp['API_TYPE'], new () => CharactersService> = {
            official: CharactersServiceApiImpl,
            custom: CharactersServiceCustomApiImpl,
        }

        const Service = servicesMap[config.API_TYPE] || CharactersServiceApiImpl

        return injector.get(Service)
    },
    deps: [ConfigService, Injector],
}
