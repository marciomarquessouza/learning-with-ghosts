import {
    ChapterTitleProps,
    DialogMenuProps,
    InfoMenuProps,
    LiveMenuProps,
} from 'modules/GhostTown/components'
import { GameKeysInputs, GAME_KEYS } from 'modules/GhostTown/player/controls'
import { GameGuiState } from 'types/GameGui'

export const chapterTitleDefault: ChapterTitleProps = {
    mainTitle: '',
    subtitle: '',
    chapterNumber: 0,
}

export const infoMenuDefault: InfoMenuProps = {
    character: undefined,
    avatar: '',
    title: '',
    onTalk: () => {},
}

export const liveMenuDefault: LiveMenuProps = {
    lives: 5,
    chapterNumber: 1,
    chapterName: '',
    day: 1,
}

export const dialogMenuDefault: DialogMenuProps = {
    title: '',
    text: '',
    onClose: () => {},
    onNext: () => {},
}

export const gameKeysInputsDefault: GameKeysInputs = {
    [GAME_KEYS.FWD_KEY]: false,
    [GAME_KEYS.BKD_KEY]: false,
    [GAME_KEYS.LFT_KEY]: false,
    [GAME_KEYS.RGT_KEY]: false,
    [GAME_KEYS.ESC_KEY]: false,
    [GAME_KEYS.SPACE_KEY]: false,
    [GAME_KEYS.I_KEY]: false,
    [GAME_KEYS.M_KEY]: false,
}

export const gameGuiInitialState: GameGuiState = {
    isChapterTitleOpen: false,
    isLiveMenuOpen: false,
    isInfoMenuOpen: false,
    isDialogMenuOpen: false,
    isMainMenuOpen: false,
    isChallengeMenuOpen: false,
    chapterTitle: chapterTitleDefault,
    liveMenu: liveMenuDefault,
    infoMenu: infoMenuDefault,
    dialogMenu: dialogMenuDefault,
    gameKeysInputs: gameKeysInputsDefault,
}
