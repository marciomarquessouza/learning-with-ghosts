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
    const { title: mainTitle, subtitle, chapterNumber } = chapter

    services.interactions.loadChapterDialogs(chapter)
    models.train.startArrivalAnimation()
    models.lighthouse.startBulbAnimation()
    models.princess.startLevitationAnimation()
    services.screenGUI.showChapterTitle({
        mainTitle,
        subtitle,
        chapterNumber,
    })
    services.screenGUI.showLiveMenu({
        lives: user.lives,
        day: user.day,
        chapterNumber,
        chapterName: mainTitle,
    })
    services.screenGUI.showMainMenu()
}
