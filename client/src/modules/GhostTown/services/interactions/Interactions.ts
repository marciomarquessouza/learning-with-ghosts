import { CHARACTER } from '../../const'
import { Chapter, Dialog } from 'types'

export class Interactions {
    private chapter: Chapter | null = null

    public loadChapterDialogs(chapter: Chapter) {
        this.chapter = chapter
    }

    private _getInteractionsData(day: number, character: CHARACTER): Dialog[] {
        if (!this.chapter) {
            throw new Error('error to load the Current Chapter Data')
        }

        const dayInteractions = this.chapter.days.find(({ dayReference }) => dayReference === day)
        if (!dayInteractions) {
            throw new Error(
                `error to load DAY in chapter: ${this.chapter.chapterNumber} adn day; ${day}`
            )
        }
        const dialogs = dayInteractions.dialogs.filter(
            ({ character: interactionCharacter }) => interactionCharacter === character
        )

        return dialogs
    }

    getInteractions(day: number, character: CHARACTER) {
        const interactions = this._getInteractionsData(day, character)

        function* createInteractionsGenerator() {
            for (let index = 0; index < interactions.length; index++) {
                yield interactions[index]
            }
        }

        return createInteractionsGenerator()
    }
}
