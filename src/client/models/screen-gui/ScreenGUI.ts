import ChapterTitle, { ChapterTitleProps } from '../../components/chapter-title/ChapterTitle'
import { InfoMenu, InfoMenuProps } from '../../components/info-menu/InfoMenu'
import { LiveMenu, LiveMenuProps } from '../../components/live-menu/LiveMenu'
import { PARAMS } from '../../const'

export class ScreenGUI {
    public showChapterTitle(props: ChapterTitleProps) {
        const chapterTitle = document.getElementById('chapter-title') as ChapterTitle
        chapterTitle.props = props
        chapterTitle.hidden = false
        setTimeout(() => {
            chapterTitle.hidden = true
        }, PARAMS.CHAPTER_TITLE_FADE_OUT)
    }

    public showLiveMenu(props: LiveMenuProps) {
        const liveMenu = document.getElementById('live-menu') as LiveMenu
        liveMenu.props = props
        liveMenu.hidden = false
    }

    public setLives(lives: number) {
        const liveMenu = document.getElementById('live-menu') as LiveMenu
        liveMenu.props = { ...liveMenu.props, lives }
    }

    public showInfoMenu(props: InfoMenuProps) {
        const infoMenu = document.getElementById('info-menu') as InfoMenu
        infoMenu.props = props
        infoMenu.hidden = false
    }

    public hideInfoMenu() {
        const infoMenu = document.getElementById('info-menu') as InfoMenu
        infoMenu.hidden = true
    }
}
