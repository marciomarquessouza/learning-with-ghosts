import createChapterTitle, { ChapterTitleProps } from '../../components/chapter-title'
import createInfoMenu, { InfoMenuProps } from '../../components/info-menu'
import { InfoMenu } from '../../components/info-menu/InfoMenu'
import createLifeMenu, { LiveMenuProps } from '../../components/live-menu'
import { LiveMenu } from '../../components/live-menu/LiveMenu'
import { PARAMS } from '../../const'

export class ScreenGUI {
    private _liveMenu: LiveMenu | null = null
    private _infoMenu: InfoMenu | null = null

    public showChapterTitle(props: ChapterTitleProps) {
        const chapterTitle = createChapterTitle(props)
        setTimeout(() => chapterTitle.unmount(), PARAMS.CHAPTER_TITLE_FADE_OUT)
    }

    public initiateLifeMenu(props: LiveMenuProps) {
        this._liveMenu = createLifeMenu(props)
    }

    public setLives(lives: number) {
        this._liveMenu?.setLives(lives)
    }

    public showInfoMenu(props: InfoMenuProps) {
        this._infoMenu = createInfoMenu(props)
    }

    public closeInfoMenu() {
        this._infoMenu?.unmount()
    }
}
