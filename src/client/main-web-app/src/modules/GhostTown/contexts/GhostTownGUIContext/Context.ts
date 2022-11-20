import { createContext } from 'react'

import { ChapterTitleProps } from 'modules/GhostTown/components/ChapterTitle'
import { InfoMenuProps } from 'modules/GhostTown/components/InfoMenu'
import { DialogMenuProps } from 'modules/GhostTown/components/DialogMenu'
import { LiveMenuProps } from 'modules/GhostTown/components/LiveMenu'
import { CHARACTER } from 'modules/GhostTown/const'

interface ModalProps {
    isOpen: boolean
}

export const chapterTitleDefault: ChapterTitleProps = {
    mainTitle: '',
    subtitle: '',
    chapterNumber: '',
}
export type ChapterTitleContext = ChapterTitleProps & ModalProps

export const infoMenuDefault: InfoMenuProps = {
    character: undefined,
    avatar: '',
    title: '',
    onTalk: () => {},
    onClose: () => {},
}
export type InfoMenuContext = InfoMenuProps & ModalProps

export const liveMenuDefault: LiveMenuProps = {
    lives: 5,
    chapterNumber: 1,
    chapterName: '',
    day: 1,
}
export type LiveMenuContext = LiveMenuProps & ModalProps

export const dialogMenuDefault: DialogMenuProps = {
    title: '',
    text: '',
    onClose: () => {},
    onNext: () => {},
}
export type DialogMenuContext = DialogMenuProps & ModalProps

export const GhostTownGUIContext = createContext({
    openChapterTitle: (props: ChapterTitleProps) => {},
    closeChapterTitle: () => {},
    openInfoMenu: (props: InfoMenuProps) => {},
    closeInfoMenu: () => {},
    openLiveMenu: (props: LiveMenuProps) => {},
    setLives: (lives: number) => {},
    closeLiveMenu: () => {},
    openDialogMenu: (props: DialogMenuProps) => {},
    closeDialogMenu: () => {},
    openMainMenu: () => {},
    closeMainMenu: () => {},
    callChallenge: (character?: CHARACTER) => {},
})