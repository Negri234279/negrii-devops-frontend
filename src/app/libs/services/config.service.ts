import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { ConfigApp } from '../@types/config-app'

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    private readonly http = inject(HttpClient)

    private _env!: ConfigApp

    getConfig(): ConfigApp {
        if (!this._env) {
            throw new Error('Config not loaded')
        }

        return this._env
    }

    loadConfig(): Promise<ConfigApp> {
        return firstValueFrom(this.http.get<ConfigApp>('/api/config')).then(
            (config) => (this._env = config)
        )
    }
}
