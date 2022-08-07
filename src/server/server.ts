import express from 'express'
import path from 'path'
import http from 'http'

const port = Number(process.env.PORT) || 3000

class App {
    private server: http.Server
    private port: number

    constructor(port: number) {
        this.port = port
        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))
        this.server = new http.Server(app)
    }

    public start() {
        this.server.listen(this.port, () => {
            console.log(`App listening on port: ${this.port}`)
        })
    }
}

const app = new App(port)
app.start()
