import React from 'react'
import { GhostTownGuiState, MENUS } from 'types/GhostTownGui'
import ChapterTitle from 'modules/GhostTown/components/ChapterTitle'
import DialogMenu from 'modules/GhostTown/components/DialogMenu'
import InfoMenu from 'modules/GhostTown/components/InfoMenu'
import LiveMenu from 'modules/GhostTown/components/LiveMenu'
import MainMenu from 'modules/GhostTown/components/MainMenu'
import ChallengeMenu from '../ChallengeMenu'

export interface MenusWrapperProps {
    guiState: GhostTownGuiState
    onCloseMenu(menu: MENUS): void
}

export default function MenusWrapper({ guiState, onCloseMenu }: MenusWrapperProps) {
    return (
        <>
            <ChallengeMenu isChallengeMenuOpen={false} />
            <ChapterTitle
                isChapterTitleOpen={guiState.isChapterTitleOpen}
                mainTitle={guiState.chapterTitle.mainTitle}
                subtitle={guiState.chapterTitle.subtitle}
                chapterNumber={guiState.chapterTitle.chapterNumber}
            />
            <InfoMenu
                isInfoMenuOpen={guiState.isInfoMenuOpen}
                character={guiState.infoMenu.character}
                avatar={guiState.infoMenu.avatar}
                title={guiState.infoMenu.title}
                onTalk={guiState.infoMenu.onTalk}
                gameKeysInputs={guiState.gameKeysInputs}
            />
            <DialogMenu
                isDialogMenuOpen={guiState.isDialogMenuOpen}
                character={guiState.dialogMenu.character}
                expression={guiState.dialogMenu.expression}
                title={guiState.dialogMenu.title}
                text={guiState.dialogMenu.text}
                onClose={guiState.dialogMenu.onClose}
                onNext={guiState.dialogMenu.onNext}
            />
            <LiveMenu
                isLiveMenuOpen={guiState.isLiveMenuOpen}
                lives={guiState.liveMenu.lives}
                chapterNumber={guiState.liveMenu.chapterNumber}
                chapterName={guiState.liveMenu.chapterName}
                day={guiState.liveMenu.day}
            />
            <MainMenu isMainMenuOpen={guiState.isMainMenuOpen} />
        </>
    )
}
