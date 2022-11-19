import { useContext } from 'react'

import {
    ChapterTitleContext,
    DialogMenuContext,
    GhostTownGUIContext,
    InfoMenuContext,
    LiveMenuContext,
} from 'contexts/GhostTownGUIContext/GhostTownGUIContext'
import {
    InfoMenuProps,
    ChapterTitleProps,
    LiveMenuProps,
    DialogMenuProps,
} from 'modules/GhostTown/elements'

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
    data: GUIData
    actions: GUIActions
}

export function useScreenGUI(): ScreenGUI {
    const {
        chapterTitle,
        openChapterTitle,
        closeChapterTitle,
        infoMenu,
        openInfoMenu,
        closeInfoMenu,
        liveMenu,
        openLiveMenu,
        closeLiveMenu,
        setLives,
        dialogMenu,
        openDialogMenu,
        closeDialogMenu,
        openMainMenu,
        closeMainMenu,
    } = useContext(GhostTownGUIContext)

    return {
        data: {
            chapterTitle,
            infoMenu,
            liveMenu,
            dialogMenu,
        },
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
