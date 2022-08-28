import express from 'express'
import http from 'http'
import { setupRouter } from './routes'

const port = Number(process.env.PORT) || 3000

const app = express()

setupRouter(app)

const server = new http.Server(app)

server.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})
