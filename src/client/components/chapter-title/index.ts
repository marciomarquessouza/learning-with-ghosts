import ChapterTitle from './ChapterTitle'

export interface ChapterTitleProps {
    title: string
    subtitle: string
    chapterNumber: number
}

function createChapterTitle(props: ChapterTitleProps) {
    return new ChapterTitle(props)
}

export default createChapterTitle
