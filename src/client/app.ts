import { createMainScene } from './scenes/main-scene'
import createLoadingElement from './components/Loading'
import createChapterTitle from './components/ChapterTitle'
import createMainSceneElement from './components/MainScene'

createLoadingElement()

createMainScene().then((mainScene) => {
    createMainSceneElement({ mainScene })
    const chapterTitle = createChapterTitle({
        title: 'WELCOME TO GHOST TOWN',
        subtitle: 'LEARNING HOW TO GREETING FRIENDS, STRANGERS AND FREAKS ',
        chapterNumber: '01',
    })
    setTimeout(() => chapterTitle.unmount(), 7000)
})
