import { createMainScene } from './scenes/main-scene'
import GhostLoading from './elements/ghost-loading/GhostLoading'

const ghostLoading = document.getElementById('ghost-loading') as GhostLoading

createMainScene().then((mainScene) => {
    ghostLoading.hidden = true
    document.getElementById('main-scene')?.appendChild(mainScene)
})
