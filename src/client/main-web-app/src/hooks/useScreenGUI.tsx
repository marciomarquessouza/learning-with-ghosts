import { useContext } from 'react'

import {
    ChapterTitleContext,
    DialogMenuContext,
    GhostTownGUIContext,
    InfoMenuContext,
    LiveMenuContext,
} from 'modules/GhostTown/contexts/GhostTownGUIContext/GhostTownGUIContext'
import {
    InfoMenuProps,
    ChapterTitleProps,
    LiveMenuProps,
    DialogMenuProps,
} from 'modules/GhostTown/components'

export type GUIData = {
    chapterTitle: ChapterTitleContext
    infoMenu: InfoMenuContext
    liveMenu: LiveMenuContext
    dialogMenu: DialogMenuContext
}

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
        },
    }
}
