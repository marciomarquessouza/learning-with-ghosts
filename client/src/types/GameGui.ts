import {
    ChapterTitleProps,
    DialogMenuProps,
    InfoMenuProps,
    LiveMenuProps,
} from 'modules/GhostTown/components'
import { CHARACTER } from 'modules/GhostTown/const'
import { GameKeysInputs, GAME_KEYS } from 'modules/GhostTown/player/controls'

export interface GameGuiState {
    isChapterTitleOpen: boolean
    isLiveMenuOpen: boolean
    isInfoMenuOpen: boolean
    isDialogMenuOpen: boolean
    isMainMenuOpen: boolean
    isChallengeMenuOpen: boolean
    infoMenu: InfoMenuProps
    dialogMenu: DialogMenuProps
    gameKeysInputs: GameKeysInputs
}
export enum ACTIONS {
    OPEN_CHAPTER_TITLE = 'openChapterTitle',
    OPEN_LIVE_MENU = 'openLiveMenu',
    OPEN_INFO_MENU = 'openInfoMenu',
    OPEN_DIALOG_MENU = 'openDialogMenu',
    OPEN_MAIN_MENU = 'openMainMenu',
    OPEN_CHALLENGE_MENU = 'openChallengeMenu',
    CLOSE_MENU = 'closeMenu',
    GET_MENU_STATE = 'getMenuState',
    SET_LIVES = 'setLives',
    CALL_CHALLENGE = 'callChallenge',
    UPDATE_KEYS_INPUTS = 'updateKeysInputs',
}
export enum MENUS {
    CHAPTER_TITLE = 'chapterTitle',
    LIVE_MENU = 'liveMenu',
    INFO_MENU = 'infoMenu',
    DIALOG_MENU = 'dialogMenu',
    MAIN_MENU = 'mainMenu',
    CHALLENGE_MENU = 'challengeMenu',
}
export type GameGuiActions =
    | { type: ACTIONS.OPEN_DIALOG_MENU; value: DialogMenuProps }
    | { type: ACTIONS.OPEN_CHAPTER_TITLE }
    | { type: ACTIONS.OPEN_INFO_MENU; value: InfoMenuProps }
    | { type: ACTIONS.OPEN_LIVE_MENU }
    | { type: ACTIONS.OPEN_CHALLENGE_MENU; value: { character: CHARACTER } }
    | { type: ACTIONS.OPEN_MAIN_MENU }
    | { type: ACTIONS.CLOSE_MENU; menu: MENUS }
    | { type: ACTIONS.GET_MENU_STATE; menu: MENUS }
    | { type: ACTIONS.UPDATE_KEYS_INPUTS; value: GAME_KEYS }

export type MenusProps =
    | { menu: MENUS.CHAPTER_TITLE; value?: null }
    | { menu: MENUS.LIVE_MENU; value?: null }
    | { menu: MENUS.INFO_MENU; value: InfoMenuProps }
    | { menu: MENUS.DIALOG_MENU; value: DialogMenuProps }
    | { menu: MENUS.CHALLENGE_MENU; value: { character: CHARACTER } }
    | { menu: MENUS.MAIN_MENU; value?: null }
