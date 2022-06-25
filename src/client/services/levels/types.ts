import { CHARACTER } from '../../const'
import { InteractionType } from '../interactions/types'

export interface ChapterData {
    chapterNumber: string
    title: string
    subtitle: string
    shortTitle: string
    days: {
        day: number
        steps: {
            step: number
            characterInteractions: {
                character: CHARACTER
                interactions: InteractionType[]
            }[]
        }[]
    }[]
}
