import { Challenge, Chapter, Dialog } from 'types'

export interface RawGameContentData {
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
                                attributes: Dialog
                            }[]
                        }
                        challenges: {
                            data: {
                                attributes: Challenge
                            }[]
                        }
                    }
                }[]
            }
        }
    }[]
    meta: Object
}

export function parseGameContent(rawData: RawGameContentData): Chapter {
    const rawChapter = rawData.data[0].attributes
    const { days: chapterDays, ...chapterHeader } = rawChapter
    const days = chapterDays.data.map(({ attributes }) => {
        const { dialogs: rawDialogs, challenges: rawChallenges, ...dayHeader } = attributes
        const dialogs = rawDialogs.data.map(({ attributes }) => attributes)
        const challenges = rawChallenges.data.map(({ attributes }) => attributes)

        return { ...dayHeader, dialogs, challenges }
    })
    return { ...chapterHeader, days }
}
