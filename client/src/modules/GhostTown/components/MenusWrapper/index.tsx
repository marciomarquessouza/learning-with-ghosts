import React from 'react'
import { GameGuiState, MENUS, MenusProps } from 'types/GameGui'
import ChapterTitle from 'modules/GhostTown/components/ChapterTitle'
import DialogMenu from 'modules/GhostTown/components/DialogMenu'
import InfoMenu from 'modules/GhostTown/components/InfoMenu'
import LiveMenu from 'modules/GhostTown/components/LiveMenu'
import MainMenu from 'modules/GhostTown/components/MainMenu'
import ChallengeMenu from '../ChallengeMenu'
import { CHARACTER } from 'modules/GhostTown/const'

export interface MenusWrapperProps {
    guiState: GameGuiState
    onOpenMenu: (menuProps: MenusProps) => void
    onCloseMenu(menu: MENUS): void
}

export default function MenusWrapper({ guiState, onCloseMenu, onOpenMenu }: MenusWrapperProps) {
    return (
        <>
            <ChallengeMenu
                character={guiState.infoMenu.character}
                isChallengeMenuOpen={guiState.isChallengeMenuOpen}
                onClose={() => onCloseMenu(MENUS.CHALLENGE_MENU)}
            />
            <ChapterTitle isChapterTitleOpen={guiState.isChapterTitleOpen} />
            <InfoMenu
                isInfoMenuOpen={guiState.isInfoMenuOpen}
                character={guiState.infoMenu.character}
                avatar={guiState.infoMenu.avatar}
                title={guiState.infoMenu.title}
                gameKeysInputs={guiState.gameKeysInputs}
                onTalk={guiState.infoMenu.onTalk}
                onChallenge={(character: CHARACTER) =>
                    onOpenMenu({ menu: MENUS.CHALLENGE_MENU, value: { character } })
                }
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
            <LiveMenu isLiveMenuOpen={guiState.isLiveMenuOpen} />
            <MainMenu isMainMenuOpen={guiState.isMainMenuOpen} />
        </>
    )
}
