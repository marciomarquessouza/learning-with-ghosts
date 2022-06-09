import { createMainScene } from './scenes/main-scene'
import createLoadingElement from './components/loading'
import createMainSceneElement from './components/main-scene-element'
// import createInfoMenu from './components/info-menu'

// createInfoMenu({
//     avatar: '/img/lightning-princess/lighthouse-princess.png',
//     title: 'LIGHTHOUSE PRINCESS',
//     onClickTalk: () => undefined,
// })

createLoadingElement()

createMainScene().then((mainScene) => {
    createMainSceneElement({ mainScene })
})
