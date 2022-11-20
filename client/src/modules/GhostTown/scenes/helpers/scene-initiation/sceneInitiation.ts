import { LANGUAGES, PARAMS } from '../../../const'
import { Models } from '../../../models/types'
import { Services } from '../../../services/types'
import { Utils } from '../../../utils/types'

export interface SceneInitiationProps {
    models: Models
    services: Services
    utils: Utils
}

export async function sceneInitiation({
    models,
    services,
    utils,
}: SceneInitiationProps): Promise<void> {
    const { train, lighthouse, princess } = models
    const { screenGUI, levels } = services
    const { storage } = utils

    const chapter = '01'
    const currentChapterData = await levels.fetchChapter(chapter)
    const { title, subtitle, shortTitle: chapterName } = currentChapterData
    services.interactions.loadChapterDialogs(currentChapterData)
    train.startArrivalAnimation()
    lighthouse.startBulbAnimation()
    princess.startLevitationAnimation()
    screenGUI.showChapterTitle({
        mainTitle: title,
        subtitle,
        chapterNumber: chapter,
    })
    screenGUI.showLiveMenu({
        lives: PARAMS.INITIAL_LIVES,
        day: 1,
        chapterNumber: 1,
        chapterName,
    })
    screenGUI.showMainMenu()
    storage.chapter = chapter
    storage.day = 1
    storage.step = 1
    storage.language = LANGUAGES.GERMAN
    storage.lives = PARAMS.INITIAL_LIVES
}
