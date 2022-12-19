import { ACTIONS, GhostTownGuiActions, GhostTownGuiState } from 'types/GhostTownGui'
import getStateKeyByMenu from '../utils/getStateKeyByMenu'

export function ghostTownGuiReducer(
    state: GhostTownGuiState,
    action: GhostTownGuiActions
): GhostTownGuiState {
    switch (action.type) {
        case ACTIONS.OPEN_DIALOG_MENU: {
            const props = action.value
            return { ...state, isDialogMenuOpen: true, dialogMenu: props }
        }
        case ACTIONS.OPEN_CHAPTER_TITLE: {
            const props = action.value
            return { ...state, isChapterTitleOpen: true, chapterTitle: props }
        }
        case ACTIONS.OPEN_INFO_MENU: {
            const props = action.value
            return { ...state, isInfoMenuOpen: true, infoMenu: props }
        }
        case ACTIONS.OPEN_LIVE_MENU: {
            const props = action.value
            return { ...state, isLiveMenuOpen: true, liveMenu: props }
        }
        case ACTIONS.OPEN_MAIN_MENU: {
            return { ...state, isMainMenuOpen: true }
        }
        case ACTIONS.CLOSE_MENU: {
            const menu = action.menu
            const key = getStateKeyByMenu(menu)
            return { ...state, [key]: false }
        }
        case ACTIONS.SET_LIVES: {
            const lives = action.lives
            const liveMenuState = state.liveMenu
            return { ...state, liveMenu: { ...liveMenuState, lives } }
        }
        default:
            return state
    }
}
