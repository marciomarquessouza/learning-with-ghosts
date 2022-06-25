import { CHARACTER } from '../../const'
import { createUtils } from '../../utils/factory/utilsFactory'
import { ChapterData } from '../levels/types'
import { InteractionType } from './types'

export class Interactions {
    private _currentChapterData: ChapterData | null = null

    constructor(private utils = createUtils()) {}

    public loadChapterDialogs(data: ChapterData) {
        this._currentChapterData = data
    }

    private _getInteractionsData(
        day: number,
        step: number,
        character: CHARACTER
    ): InteractionType[] {
        if (!this._currentChapterData) {
            throw new Error('error to load the Current Chapter Data')
        }

        const { chapterNumber } = this._currentChapterData
        const currentChapterInteractions = this._currentChapterData

        if (!currentChapterInteractions) {
            throw new Error(`error to load CHAPTER in chapter_${chapterNumber}`)
        }

        const dayInteractions = currentChapterInteractions.days.find(
            ({ day: interactionDay }) => interactionDay === day
        )
        if (!dayInteractions) {
            throw new Error(`error to load DAY in chapter_${chapterNumber}-day-${day}`)
        }
        const stepInteractions = dayInteractions.steps.find(
            ({ step: interactionStep }) => interactionStep === step
        )
        if (!stepInteractions) {
            throw new Error(
                `error to load STEP in chapter_${chapterNumber}-day-${day}-step-${step}`
            )
        }
        const characterInteractions = stepInteractions.characterInteractions.find(
            ({ character: interactionCharacter }) => interactionCharacter === character
        )
        if (!characterInteractions) {
            throw new Error(
                `error to load CHARACTER in chapter_${chapterNumber}-day-${day}-step-${step}-character-${character}`
            )
        }

        return characterInteractions.interactions
    }

    getInteractions(character: CHARACTER) {
        const storage = this.utils.storage
        const day = storage.day
        const step = storage.step
        const interactions = this._getInteractionsData(day, step, character)

        function* createInteractionsGenerator() {
            for (let index = 0; index < interactions.length; index++) {
                yield interactions[index]
            }
        }

        return createInteractionsGenerator()
    }
}
