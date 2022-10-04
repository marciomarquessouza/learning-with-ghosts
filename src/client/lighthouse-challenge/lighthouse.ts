import { config } from './main/config'
import { getPhaser } from './api'
import { scene01 } from '..'

console.log('loding...')

const gameContainer = document.createElement('div')
gameContainer.id = 'game-container'
document.body.appendChild(gameContainer)

async function getGame() {
    const gameConfig = config(scene01)
    window.game = await getPhaser({ ...gameConfig, parent: 'game-container' })
}

getGame().then(() => {
    console.log('game loaded')
})
