import { PARAMS } from '../../../const'
import { Models } from '../../../models/types'
import { Services } from '../../../services/types'
import { Chapter, User } from 'types'

export interface SceneInitiationProps {
    models: Models
    services: Services
    user: User
    chapter: Chapter
}

export async function sceneInitiation({
    models,
    services,
    user,
    chapter,
}: SceneInitiationProps): Promise<void> {
    const { train, lighthouse, princess } = models
    const { screenGUI } = services

    const { title, subtitle, chapterNumber } = chapter
    services.interactions.loadChapterDialogs(chapter)
    train.startArrivalAnimation()
    lighthouse.startBulbAnimation()
    princess.startLevitationAnimation()
    screenGUI.showChapterTitle({
        mainTitle: title,
        subtitle,
        chapterNumber,
    })
    screenGUI.showLiveMenu({
        lives: user.lives,
        day: user.day,
        chapterNumber,
        chapterName: title,
    })
    screenGUI.showMainMenu()
}
