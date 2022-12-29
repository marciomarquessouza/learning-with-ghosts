import { PARAMS } from '../../../const'
import { Models } from '../../../models/types'
import { Services } from '../../../services/types'
import { Chapter, User } from 'types'

export interface SceneInitiationProps {
    models: Models
    services: Services
    chapter: Chapter
}

export async function sceneInitiation({
    models,
    services,
    chapter,
}: SceneInitiationProps): Promise<void> {
    services.interactions.loadChapterDialogs(chapter)
    models.train.startArrivalAnimation()
    models.lighthouse.startBulbAnimation()
    models.princess.startLevitationAnimation()
    services.screenGUI.showChapterTitle()
    services.screenGUI.showLiveMenu()
    services.screenGUI.showMainMenu()
}
