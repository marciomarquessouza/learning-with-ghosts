import { ChapterData } from './types'

export class Levels {
    private _currentChapter: ChapterData | null = null

    public async fetchChapter(chapter: string): Promise<ChapterData> {
        try {
            const response = await fetch(`/data/chapter_${chapter}.json`)
            this._currentChapter = (await response.json()) as ChapterData
            return this._currentChapter
        } catch (error) {
            throw new Error(`error to load CHAPTER in chapter_${chapter}`)
        }
    }

    get currentChapter() {
        if (!this._currentChapter) {
            throw new Error('Error to load current chapter')
        }

        return this._currentChapter
    }
}
