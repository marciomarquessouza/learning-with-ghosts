import { ChapterTitleProps } from '../../components/ChapterTitle'
import { InfoMenuProps } from '../../components/InfoMenu'
import { LiveMenuProps } from '../../components/LiveMenu'
import { DialogMenuProps } from '../../components/DialogMenu'
import { CHARACTER, PARAMS } from '../../const'
import { MENUS } from 'types/GameGui'
import { menuObserver } from 'modules/GhostTown/observers'
import { GAME_KEYS } from 'modules/GhostTown/player/controls'
import { GameGuiContextType } from 'modules/GhostTown/contexts/GameGuiContext'

export class ScreenGUI {
    constructor(private context: GameGuiContextType) {}

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

    public showChallengeMenu(character: CHARACTER) {
        this.context.openMenu({ menu: MENUS.CHALLENGE_MENU, value: { character } })
    }

    public closeChallengeMenu() {
        this.context.closeMenu(MENUS.CHALLENGE_MENU)
    }

    public callChallenge(character?: CHARACTER) {
        this.context.callChallenge(character)
    }

    public onKeyDown(gameKeyInput: GAME_KEYS) {
        this.context.onKeyDown(gameKeyInput)
    }
}
