import {
    ChapterTitleProps,
    DialogMenuProps,
    InfoMenuProps,
    LiveMenuProps,
} from 'modules/GhostTown/components'
import { GhostTownGuiState } from 'types/GhostTownGui'

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

export const ghostTownGuiInitialState: GhostTownGuiState = {
    isChapterTitleOpen: false,
    isLiveMenuOpen: false,
    isInfoMenuOpen: false,
    isDialogMenuOpen: false,
    isMainMenuOpen: false,
    chapterTitle: chapterTitleDefault,
    liveMenu: liveMenuDefault,
    infoMenu: infoMenuDefault,
    dialogMenu: dialogMenuDefault,
}
