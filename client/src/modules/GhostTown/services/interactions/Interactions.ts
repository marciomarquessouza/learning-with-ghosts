import { CHARACTER } from '../../const'
import { Chapter, Dialog } from 'types'

export class Interactions {
    private chapter: Chapter | null = null

    public loadChapterDialogs(chapter: Chapter) {
        this.chapter = chapter
    }

    private _getInteractionsData(day: number, step: number, character: CHARACTER): Dialog[] {
        if (!this.chapter) {
            throw new Error('error to load the Current Chapter Data')
        }

        const dayInteractions = this.chapter.days.find(
            ({ day: interactionDay }) => interactionDay === day
        )
        if (!dayInteractions) {
            throw new Error(`error to load DAY in chapter_${this.chapter.chapterNumber}-day-${day}`)
        }
        const dialogs = dayInteractions.dialogs.filter(
            ({ step: interactionStep }) => interactionStep === step
        )

        return dialogs
    }

    getInteractions(day: number, step: number, character: CHARACTER) {
        const interactions = this._getInteractionsData(day, step, character)

        function* createInteractionsGenerator() {
            for (let index = 0; index < interactions.length; index++) {
                yield interactions[index]
            }
        }

        return createInteractionsGenerator()
    }
}
