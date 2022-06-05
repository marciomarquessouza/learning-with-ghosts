import createChapterTitle, { ChapterTitleProps } from '../../components/ChapterTitle'
import { PARAMS } from '../../const'

export class ScreenUI {
    public showChapterTitle(props: ChapterTitleProps) {
        const chapterTitle = createChapterTitle(props)
        setTimeout(() => chapterTitle.unmount, PARAMS.CHAPTER_TITLE_FADE_OUT)
    }
}

export function createScreenUI() {
    return new ScreenUI()
}
