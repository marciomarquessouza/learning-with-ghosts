import { ChapterTitleProps } from '../../components/ChapterTitle'
import { InfoMenuProps } from '../../components/InfoMenu'
import { LiveMenuProps } from '../../components/LiveMenu'
import { DialogMenuProps } from '../../components/DialogMenu'
import { CHARACTER, PARAMS } from '../../const'
import { GhostTownGuiContextType, MENUS } from 'types/GhostTownGui'
import { menuObserver } from 'modules/GhostTown/observers'

export class ScreenGUI {
    constructor(private context: GhostTownGuiContextType) {}

    public showChapterTitle(props: ChapterTitleProps) {
        this.context.openMenu({ menu: MENUS.CHAPTER_TITLE, value: props })
        setTimeout(() => this.closeChapterTitle(), PARAMS.CHAPTER_TITLE_FADE_OUT)
    }

    public closeChapterTitle() {
        this.context.closeMenu(MENUS.CHAPTER_TITLE)
    }

    public showInfoMenu(props: InfoMenuProps) {
        const infoMenu = menuObserver.getInfoMenuState()
        const isOpen = infoMenu.isOpen
        if (!isOpen) {
            this.context.openMenu({ menu: MENUS.INFO_MENU, value: props })
        }
    }

    public closeInfoMenu() {
        this.context.closeMenu(MENUS.INFO_MENU)
    }

    public isInfoMenuOpenWith() {
        const infoMenu = menuObserver.getInfoMenuState()
        const openedWith = infoMenu.character
        const isOpen = infoMenu.isOpen
        return { isOpen, openedWith }
    }

    public showLiveMenu(props: LiveMenuProps) {
        this.context.openMenu({ menu: MENUS.LIVE_MENU, value: props })
    }

    public setLives(lives: number) {
        this.context.setLives(lives)
    }

    public showDialogMenu(props: DialogMenuProps) {
        this.context.openMenu({ menu: MENUS.DIALOG_MENU, value: props })
    }

    public closeDialogMenu() {
        this.context.closeMenu(MENUS.DIALOG_MENU)
    }

    public showMainMenu() {
        this.context.openMenu({ menu: MENUS.MAIN_MENU })
    }

    public closeMainMenu() {
        this.context.closeMenu(MENUS.MAIN_MENU)
    }

    public closeActiveMenus() {
        this.context.closeMenu(MENUS.DIALOG_MENU)
    }

    public callChallenge(character?: CHARACTER) {
        this.context.callChallenge(character)
    }
}
