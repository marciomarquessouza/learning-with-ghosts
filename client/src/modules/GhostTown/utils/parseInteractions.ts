import { Chapter } from 'types'
import { CHARACTER, EXPRESSION } from '../const'

export interface RawInteractionData {
    data: {
        attributes: {
            title: string
            subtitle: string
            shortTitle: string
            chapterNumber: number
            days: {
                data: {
                    attributes: {
                        order: number
                        title: string
                        dialogs: {
                            data: {
                                attributes: {
                                    type: string
                                    from: CHARACTER
                                    text: string
                                    expression: EXPRESSION
                                    order: number
                                    character: CHARACTER
                                    step: number
                                }
                            }[]
                        }
                    }
                }[]
            }
        }
    }[]
    meta: Object
}

export function parseInteractions(rawData: RawInteractionData): Chapter {
    const rawChapter = rawData.data[0].attributes
    const { days: chapterDays, ...chapterHeader } = rawChapter
    const days = chapterDays.data.map(({ attributes }) => {
        const { dialogs: rawDialogs, ...dayHeader } = attributes
        const dialogs = rawDialogs.data.map(({ attributes }) => attributes)
        return { ...dayHeader, dialogs }
    })
    return { ...chapterHeader, days }
}
