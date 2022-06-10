import ChapterTitle, { ChapterTitleProps } from '../../elements/chapter-title/ChapterTitle'
import { InfoMenu, InfoMenuProps } from '../../elements/info-menu/InfoMenu'
import { LiveMenu, LiveMenuProps } from '../../elements/live-menu/LiveMenu'
import { ELEMENTS, PARAMS } from '../../const'

export class ScreenGUI {
    private _activeMenus: ELEMENTS[] = []

    private getElement<T>(element: ELEMENTS): T {
        const elementDocument: unknown = document.getElementById(element)
        return elementDocument as T
    }

    private addActiveMenu(element: ELEMENTS) {
        this._activeMenus.push(element)
    }

    private removeActiveMenu(element: ELEMENTS) {
        this._activeMenus.filter((menu) => menu !== element)
    }

    public showChapterTitle(props: ChapterTitleProps) {
        const chapterTitle = this.getElement<ChapterTitle>(ELEMENTS.CHAPTER_TITLE)
        chapterTitle.props = props
        chapterTitle.hidden = false
        this.addActiveMenu(ELEMENTS.CHAPTER_TITLE)
        setTimeout(() => this.closeChapterTitle(), PARAMS.CHAPTER_TITLE_FADE_OUT)
    }

    public closeChapterTitle() {
        const chapterTitle = this.getElement<ChapterTitle>(ELEMENTS.CHAPTER_TITLE)
        chapterTitle.hidden = true
        this.removeActiveMenu(ELEMENTS.CHAPTER_TITLE)
    }

    public showInfoMenu(props: InfoMenuProps) {
        const infoMenu = this.getElement<InfoMenu>(ELEMENTS.INFO_MENU)
        infoMenu.props = props
        infoMenu.hidden = false
        this.addActiveMenu(ELEMENTS.INFO_MENU)
    }

    public closeInfoMenu() {
        const infoMenu = this.getElement<InfoMenu>(ELEMENTS.INFO_MENU)
        infoMenu.hidden = true
        this.removeActiveMenu(ELEMENTS.INFO_MENU)
    }

    public showLiveMenu(props: LiveMenuProps) {
        const liveMenu = this.getElement<LiveMenu>(ELEMENTS.LIVE_MENU)
        liveMenu.props = props
        liveMenu.hidden = false
    }

    public setLives(lives: number) {
        const liveMenu = this.getElement<LiveMenu>(ELEMENTS.LIVE_MENU)
        liveMenu.props = { ...liveMenu.props, lives }
    }

    public closeActiveMenus() {
        this._activeMenus.forEach((menu) => {
            const element = this.getElement<HTMLElement>(menu)
            element.hidden = true
        })
    }
}
