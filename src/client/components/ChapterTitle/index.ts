import ChapterTitle from './ChapterTitle'

export interface ChapterTitleProps {
    title: string
    subtitle: string
    chapterNumber: string
}

function createChapterTitle(props: ChapterTitleProps) {
    return new ChapterTitle(props)
}

export default createChapterTitle
