import { ChapterTitleProps } from '../../elements/ChapterTitle'
import { InfoMenuProps } from '../../elements/InfoMenu'
import { LiveMenuProps } from '../../elements/LiveMenu'
import { DialogMenuProps } from '../../elements/DialogMenu'
import { PARAMS } from '../../const'
import { GUIActions, GUIData } from 'hooks/useScreenGUI'
import { menuObserver } from 'modules/GhostTown/observers'

export class ScreenGUI {
    constructor(private guiData: GUIData, private guiActions: GUIActions) {}

    public showChapterTitle({ mainTitle, subtitle, chapterNumber }: ChapterTitleProps) {
        this.guiActions.openChapterTitle({ mainTitle, subtitle, chapterNumber })
        setTimeout(() => this.closeChapterTitle(), PARAMS.CHAPTER_TITLE_FADE_OUT)
    }

    public closeChapterTitle() {
        this.guiActions.closeChapterTitle()
    }

    public showInfoMenu(props: InfoMenuProps) {
        this.guiActions.openInfoMenu(props)
    }

    public closeInfoMenu() {
        this.guiActions.closeInfoMenu()
    }

    public isInfoMenuOpenWith() {
        const infoMenu = menuObserver.getInfoMenuState()
        const openedWith = infoMenu.character
        const isOpen = infoMenu.isOpen
        return { isOpen, openedWith }
    }

    public showLiveMenu(props: LiveMenuProps) {
        this.guiActions.openLiveMenu(props)
    }

    public setLives(lives: number) {
        this.guiActions.setLives(lives)
    }

    public showDialogMenu(props: DialogMenuProps) {
        this.guiActions.openDialogMenu(props)
    }

    public closeDialogMenu() {
        this.guiActions.closeDialogMenu()
    }

    public showMainMenu() {
        this.guiActions.openMainMenu()
    }

    public closeMainMenu() {
        this.guiActions.closeMainMenu()
    }

    public closeActiveMenus() {
        this.guiActions.closeInfoMenu()
        this.guiActions.closeDialogMenu()
    }
}
