import React, { useState } from 'react'
import { useRouter } from 'next/router'

import ChapterTitle, { ChapterTitleProps } from 'modules/GhostTown/components/ChapterTitle'
import InfoMenu, { InfoMenuProps } from 'modules/GhostTown/components/InfoMenu'
import DialogMenu, { DialogMenuProps } from 'modules/GhostTown/components/DialogMenu'
import LiveMenu, { LiveMenuProps } from 'modules/GhostTown/components/LiveMenu'
import MainMenu from 'modules/GhostTown/components/MainMenu'
import {
    chapterTitleDefault,
    dialogMenuDefault,
    GhostTownGUIContext,
    infoMenuDefault,
    liveMenuDefault,
} from './Context'
import { menuSubject } from 'modules/GhostTown/observers'
import { CHARACTER } from 'modules/GhostTown/const'

export interface GhostTownGUIProviderProps {
    children: React.ReactNode
}

function GhostTownGUIProvider({ children }: GhostTownGUIProviderProps) {
    const router = useRouter()
    const [openChapterTitleVisible, setOpenChapterTitleVisible] = useState(false)
    const [chapterTitle, setChapterTitle] = useState<ChapterTitleProps>(chapterTitleDefault)

    const [liveMenuVisible, setLiveMenuVisible] = useState(false)
    const [liveMenu, setLiveMenu] = useState<LiveMenuProps>(liveMenuDefault)

    const [infoMenuVisible, setInfoMenuVisible] = useState(false)
    const [infoMenu, setInfoMenu] = useState<InfoMenuProps>(infoMenuDefault)

    const [dialogMenuVisible, setDialogMenuVisible] = useState(false)
    const [dialogMenu, setDialogMenu] = useState<DialogMenuProps>(dialogMenuDefault)

    const [mainMenuVisible, setMainMenuVisible] = useState(false)

    const handleOpenChapterTitle = (props: ChapterTitleProps) => {
        setChapterTitle(props)
        setOpenChapterTitleVisible(true)
    }

    const handleCloseChapterTitle = () => {
        setChapterTitle(chapterTitleDefault)
        setOpenChapterTitleVisible(false)
    }

    const handleOpenInfoMenu = (props: InfoMenuProps) => {
        setInfoMenu(props)
        menuSubject.notifyInfoMenu({ ...props, isOpen: true })
        setInfoMenuVisible(true)
    }

    const handleCloseInfoMenu = () => {
        menuSubject.notifyInfoMenu({ ...infoMenuDefault, isOpen: false })
        setInfoMenuVisible(false)
    }

    const handleOpenLiveMenu = (props: LiveMenuProps) => {
        setLiveMenu(props)
        setLiveMenuVisible(true)
    }

    const handleCloseLiveMenu = () => {
        setLiveMenu(liveMenuDefault)
        setLiveMenuVisible(false)
    }

    const handleChangeLives = (lives: number) => {
        if (lives >= 0) {
            setLiveMenu({ ...liveMenu, lives })
        }
    }

    const handleOpenDialogMenu = (props: DialogMenuProps) => {
        setDialogMenu(props)
        menuSubject.notifyDialogMenu({ ...props, isOpen: true })
        setDialogMenuVisible(true)
    }

    const handleCloseDialogMenu = () => {
        menuSubject.notifyDialogMenu({ ...dialogMenuDefault, isOpen: false })
        setDialogMenuVisible(false)
    }

    const handleOpenMainMenu = () => {
        setMainMenuVisible(true)
    }

    const handleCloseMainMenu = () => {
        setMainMenuVisible(false)
    }

    const handleCallChallenge = (character?: CHARACTER) => {
        router.push('/lighthouse')
    }

    return (
        <GhostTownGUIContext.Provider
            value={{
                openChapterTitle: handleOpenChapterTitle,
                closeChapterTitle: handleCloseChapterTitle,
                openInfoMenu: handleOpenInfoMenu,
                closeInfoMenu: handleCloseInfoMenu,
                openLiveMenu: handleOpenLiveMenu,
                setLives: handleChangeLives,
                closeLiveMenu: handleCloseLiveMenu,
                openDialogMenu: handleOpenDialogMenu,
                closeDialogMenu: handleCloseDialogMenu,
                openMainMenu: handleOpenMainMenu,
                closeMainMenu: handleCloseMainMenu,
                callChallenge: handleCallChallenge,
            }}
        >
            {openChapterTitleVisible && <ChapterTitle {...chapterTitle} />}
            {dialogMenuVisible && (
                <DialogMenu {...{ ...dialogMenu, onClose: handleCloseDialogMenu }} />
            )}
            <InfoMenu
                {...{ ...infoMenu, isShowing: infoMenuVisible, onClose: handleCloseInfoMenu }}
            />

            {liveMenuVisible && <LiveMenu {...liveMenu} />}
            {mainMenuVisible && <MainMenu />}
            {children}
        </GhostTownGUIContext.Provider>
    )
}

export default GhostTownGUIProvider
