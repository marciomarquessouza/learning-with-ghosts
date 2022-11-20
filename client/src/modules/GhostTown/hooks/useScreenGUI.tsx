import { useContext } from 'react'

import { GhostTownGUIContext } from 'modules/GhostTown/contexts/GhostTownGUIContext/Context'
import {
    InfoMenuProps,
    ChapterTitleProps,
    LiveMenuProps,
    DialogMenuProps,
} from 'modules/GhostTown/components'
import { CHARACTER } from '../const'

export type GUIActions = {
    openChapterTitle: (props: ChapterTitleProps) => void
    closeChapterTitle: () => void
    openInfoMenu: (props: InfoMenuProps) => void
    closeInfoMenu: () => void
    openLiveMenu: (props: LiveMenuProps) => void
    setLives: (lives: number) => void
    closeLiveMenu: () => void
    openDialogMenu: (props: DialogMenuProps) => void
    closeDialogMenu: () => void
    openMainMenu: () => void
    closeMainMenu: () => void
    callChallenge: (character?: CHARACTER) => void
}

export interface ScreenGUI {
    actions: GUIActions
}

export function useScreenGUI(): ScreenGUI {
    const {
        openChapterTitle,
        closeChapterTitle,
        openInfoMenu,
        closeInfoMenu,
        openLiveMenu,
        closeLiveMenu,
        setLives,
        openDialogMenu,
        closeDialogMenu,
        openMainMenu,
        closeMainMenu,
        callChallenge,
    } = useContext(GhostTownGUIContext)

    return {
        actions: {
            openChapterTitle,
            closeChapterTitle,
            openInfoMenu,
            closeInfoMenu,
            openLiveMenu,
            closeLiveMenu,
            setLives,
            openDialogMenu,
            closeDialogMenu,
            openMainMenu,
            closeMainMenu,
            callChallenge,
        },
    }
}
