import { createMainScene } from './scenes/main-scene'
import createLoadingElement from './components/loading'
import createMainSceneElement from './components/main-scene-element'

createLoadingElement()

createMainScene().then((mainScene) => {
    createMainSceneElement({ mainScene })
})
