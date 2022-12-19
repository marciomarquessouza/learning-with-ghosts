import {
    ChapterTitleProps,
    DialogMenuProps,
    InfoMenuProps,
    LiveMenuProps,
} from 'modules/GhostTown/components'
import { CHARACTER } from 'modules/GhostTown/const'

export interface GhostTownGuiState {
    isChapterTitleOpen: boolean
    isLiveMenuOpen: boolean
    isInfoMenuOpen: boolean
    isDialogMenuOpen: boolean
    isMainMenuOpen: boolean
    chapterTitle: ChapterTitleProps
    liveMenu: LiveMenuProps
    infoMenu: InfoMenuProps
    dialogMenu: DialogMenuProps
}
export enum ACTIONS {
    OPEN_CHAPTER_TITLE = 'openChapterTitle',
    OPEN_LIVE_MENU = 'openLiveMenu',
    OPEN_INFO_MENU = 'openInfoMenu',
    OPEN_DIALOG_MENU = 'openDialogMenu',
    OPEN_MAIN_MENU = 'openMainMenu',
    CLOSE_MENU = 'closeMenu',
    GET_MENU_STATE = 'getMenuState',
    SET_LIVES = 'setLives',
    CALL_CHALLENGE = 'callChallenge',
}
export enum MENUS {
    CHAPTER_TITLE = 'chapterTitle',
    LIVE_MENU = 'liveMenu',
    INFO_MENU = 'infoMenu',
    DIALOG_MENU = 'dialogMenu',
    MAIN_MENU = 'mainMenu',
}
export type GhostTownGuiActions =
    | { type: ACTIONS.OPEN_DIALOG_MENU; value: DialogMenuProps }
    | { type: ACTIONS.OPEN_CHAPTER_TITLE; value: ChapterTitleProps }
    | { type: ACTIONS.OPEN_INFO_MENU; value: InfoMenuProps }
    | { type: ACTIONS.OPEN_LIVE_MENU; value: LiveMenuProps }
    | { type: ACTIONS.OPEN_MAIN_MENU }
    | { type: ACTIONS.CLOSE_MENU; menu: MENUS }
    | { type: ACTIONS.GET_MENU_STATE; menu: MENUS }
    | { type: ACTIONS.SET_LIVES; lives: number }

export type MenusProps =
    | { menu: MENUS.CHAPTER_TITLE; value: ChapterTitleProps }
    | { menu: MENUS.LIVE_MENU; value: LiveMenuProps }
    | { menu: MENUS.INFO_MENU; value: InfoMenuProps }
    | { menu: MENUS.DIALOG_MENU; value: DialogMenuProps }
    | { menu: MENUS.MAIN_MENU; value?: null }

export interface GhostTownGuiContextType {
    openMenu: (menuProps: MenusProps) => void
    closeMenu: (menu: MENUS) => void
    setLives: (lives: number) => void
    callChallenge: (character?: CHARACTER) => void
}
