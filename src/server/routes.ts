import express from 'express'
import path from 'path'

export function setupRouter(app: express.Express) {
    const router = express.Router()

    router.get('/', (req: express.Request, res: express.Response) => {
        res.sendFile(path.join(__dirname, '../client/main-page.html'))
    })

    router.get('/ghost-town', (req: express.Request, res: express.Response) => {
        res.sendFile(path.join(__dirname, '../client/ghost-town.html'))
    })

    router.get('/lighthouse', (req: express.Request, res: express.Response) => {
        res.sendFile(path.join(__dirname, '../client/lighthouse.html'))
    })

    router.get('/terms', (req: express.Request, res: express.Response) => {
        res.sendFile(path.join(__dirname, '../client/terms-conditions.html'))
    })

    app.use(express.static(path.join(__dirname, '../client')))

    app.use('/', router)
}
