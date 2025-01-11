import { APP_BASE_HREF } from '@angular/common'
import { CommonEngine } from '@angular/ssr'
import express from 'express'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as dotenv from 'dotenv'

import bootstrap from './src/main.server'

dotenv.config()

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
    const server = express()
    const serverDistFolder = dirname(fileURLToPath(import.meta.url))
    const browserDistFolder = resolve(serverDistFolder, '../browser')
    const indexHtml = join(serverDistFolder, 'index.server.html')

    const commonEngine = new CommonEngine()

    server.set('view engine', 'html')
    server.set('views', browserDistFolder)

    // Example Express Rest API endpoints
    // server.get('/api/**', (req, res) => { });
    // Serve static files from /browser
    server.get('/api/config', (_req, res, _next) => {
        try {
            const env = {
                API_TYPE: process?.env['API_TYPE'] || 'official',
            }

            res.json(env)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

    server.get(
        '**',
        express.static(browserDistFolder, {
            maxAge: '1y',
            index: 'index.html',
        })
    )

    // All regular routes use the Angular engine
    server.get('**', (req, res, next) => {
        const { protocol, originalUrl, baseUrl, headers } = req

        commonEngine
            .render({
                bootstrap,
                documentFilePath: indexHtml,
                url: `${protocol}://${headers.host}${originalUrl}`,
                publicPath: browserDistFolder,
                providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
            })
            .then((html) => res.send(html))
            .catch((err) => next(err))
    })

    return server
}

function run(): void {
    const port = process.env['PORT'] || 4000

    const server = app()
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`)
    })
}

run()
