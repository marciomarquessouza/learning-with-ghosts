import { createContext } from 'react'

import { ChapterTitleProps } from 'modules/GhostTown/elements/ChapterTitle'
import { InfoMenuProps } from 'modules/GhostTown/elements/InfoMenu'
import { DialogMenuProps } from 'modules/GhostTown/elements/DialogMenu'
import { LiveMenuProps } from 'modules/GhostTown/elements/LiveMenu'

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
    character: null,
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
})
