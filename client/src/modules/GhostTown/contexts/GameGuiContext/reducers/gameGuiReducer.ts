import { ACTIONS, GameGuiActions, GameGuiState } from 'types/GameGui'
import { gameKeysInputsDefault } from './gameGuiInitialState'
import getStateKeyByMenu from '../utils/getStateKeyByMenu'

export function gameGuiReducer(state: GameGuiState, action: GameGuiActions): GameGuiState {
    switch (action.type) {
        case ACTIONS.OPEN_DIALOG_MENU: {
            const props = action.value
            return { ...state, isDialogMenuOpen: true, dialogMenu: props }
        }
        case ACTIONS.OPEN_CHAPTER_TITLE: {
            return { ...state, isChapterTitleOpen: true }
        }
        case ACTIONS.OPEN_INFO_MENU: {
            const props = action.value
            return {
                ...state,
                isInfoMenuOpen: true,
                gameKeysInputs: gameKeysInputsDefault,
                infoMenu: props,
            }
        }
        case ACTIONS.OPEN_LIVE_MENU: {
            return { ...state, isLiveMenuOpen: true }
        }
        case ACTIONS.OPEN_MAIN_MENU: {
            return { ...state, isMainMenuOpen: true }
        }
        case ACTIONS.OPEN_CHALLENGE_MENU: {
            return { ...state, isChallengeMenuOpen: true }
        }
        case ACTIONS.CLOSE_MENU: {
            const menu = action.menu
            const key = getStateKeyByMenu(menu)
            return { ...state, [key]: false }
        }
        case ACTIONS.UPDATE_KEYS_INPUTS: {
            const newKeyInput = action.value
            const updateGameKeyInput = { ...gameKeysInputsDefault, [newKeyInput]: true }
            return { ...state, gameKeysInputs: updateGameKeyInput }
        }
        default:
            return state
    }
}
