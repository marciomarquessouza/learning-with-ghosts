import { CHARACTER } from '../../const'
import { Utils } from '../../utils/types'
import { Levels } from '../levels'
import { InteractionType } from './types'

export class Interactions {
    constructor(private levels: Levels, private utils: Utils) {}

    private _getInteractionsData(
        chapter: string,
        day: number,
        step: number,
        character: CHARACTER
    ): InteractionType[] {
        const currentChapterInteractions = this.levels.currentChapter

        if (!currentChapterInteractions) {
            throw new Error(`error to load CHAPTER in chapter_${chapter}`)
        }

        const dayInteractions = currentChapterInteractions.days.find(
            ({ day: interactionDay }) => interactionDay === day
        )
        if (!dayInteractions) {
            throw new Error(`error to load DAY in chapter_${chapter}-day-${day}`)
        }
        const stepInteractions = dayInteractions.steps.find(
            ({ step: interactionStep }) => interactionStep === step
        )
        if (!stepInteractions) {
            throw new Error(`error to load STEP in chapter_${chapter}-day-${day}-step-${step}`)
        }
        const characterInteractions = stepInteractions.characterInteractions.find(
            ({ character: interactionCharacter }) => interactionCharacter === character
        )
        if (!characterInteractions) {
            throw new Error(
                `error to load CHARACTER in chapter_${chapter}-day-${day}-step-${step}-character-${character}`
            )
        }

        return characterInteractions.interactions
    }

    getInteractions(character: CHARACTER) {
        const storage = this.utils.storage
        const chapter = storage.chapter
        const day = storage.day
        const step = storage.step
        const interactions = this._getInteractionsData(chapter, day, step, character)

        return function* () {
            for (let index = 0; index < interactions.length; index++) {
                yield interactions[index]
            }
        }
    }
}
