import { APP_INITIALIZER, Provider } from '@angular/core'
import { ConfigService } from '../services/config.service'
import { ConfigApp } from '../@types/config-app'

export const appInitializerConfigProvider: Provider = {
    provide: APP_INITIALIZER,
    useFactory: (configService: ConfigService): (() => Promise<ConfigApp>) => {
        return () => configService.loadConfig()
    },
    deps: [ConfigService],
    multi: true,
}
