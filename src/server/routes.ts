import express from 'express'
import path from 'path'

export function setupRouter(app: express.Express) {
    const router = express.Router()

    router.get('/ghost-town', (req: express.Request, res: express.Response) => {
        res.sendFile(path.join(__dirname, '../client/ghost-town.html'))
    })

    router.get('/lighthouse', (req: express.Request, res: express.Response) => {
        res.sendFile(path.join(__dirname, '../client/lighthouse.html'))
    })

    app.use(express.static(path.join(__dirname, '../client')))

    app.use('/', router)
}
