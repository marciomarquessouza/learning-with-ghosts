import ChapterTitle, { ChapterTitleProps } from '../../elements/chapter-title/ChapterTitle'
import InfoMenu, { InfoMenuProps, INFO_MENU_DEFAULTS } from '../../elements/info-menu/InfoMenu'
import LiveMenu, { LiveMenuProps } from '../../elements/live-menu/LiveMenu'
import DialogMenu, {
    DialogMenuProps,
    DIALOG_MENU_DEFAULTS,
} from '../../elements/dialog-menu/DialogMenu'
import { CHARACTER, ELEMENTS, PARAMS } from '../../const'
import MainMenu from '../../elements/main-menu/MainMenu'

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
        infoMenu.props = INFO_MENU_DEFAULTS
        this.removeActiveMenu(ELEMENTS.INFO_MENU)
    }

    public isInfoMenuOpenWith(): { isOpen: boolean; openedWith: CHARACTER | null } {
        const infoMenu = this.getElement<InfoMenu>(ELEMENTS.INFO_MENU)
        const openedWith = infoMenu.props.character
        return { isOpen: !infoMenu.hidden, openedWith }
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

    public showDialogMenu(props: DialogMenuProps) {
        const dialogMenu = this.getElement<DialogMenu>(ELEMENTS.DIALOG_MENU)
        dialogMenu.props = props
        dialogMenu.hidden = false
        // animation reset - TODO: move this for a utils folder
        const textElement = document.getElementById(ELEMENTS.DIALOG_MENU_TEXT)
        if (textElement) {
            textElement.classList.remove('animate-typing-slow')
            void textElement.offsetWidth
            textElement.classList.add('animate-typing-slow')
        }
        this.addActiveMenu(ELEMENTS.DIALOG_MENU)
    }

    public closeDialogMenu() {
        const dialogMenu = this.getElement<DialogMenu>(ELEMENTS.DIALOG_MENU)
        dialogMenu.props = DIALOG_MENU_DEFAULTS
        dialogMenu.hidden = true
        this.removeActiveMenu(ELEMENTS.DIALOG_MENU)
    }

    public showMainMenu() {
        const mainMenu = this.getElement<MainMenu>(ELEMENTS.MAIN_MENU)
        mainMenu.hidden = false
    }

    public closeMainMenu() {
        const mainMenu = this.getElement<MainMenu>(ELEMENTS.MAIN_MENU)
        mainMenu.hidden = true
    }

    public closeActiveMenus() {
        this._activeMenus.forEach((menu) => {
            const element = this.getElement<HTMLElement>(menu)
            element.hidden = true
        })
    }
}
