import React, { createContext, useCallback, useReducer, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'

import { CHARACTER } from 'modules/GhostTown/const'
import { gameGuiReducer } from './reducers/gameGuiReducer'
import { gameGuiInitialState } from './reducers/gameGuiInitialState'
import { ACTIONS, MENUS, MenusProps } from 'types/GameGui'
import { menuSubject } from 'modules/GhostTown/observers'
import getActionByMenu from './utils/getActionByMenu'

import MenusWrapper from 'modules/GhostTown/components/MenusWrapper'
import { GAME_KEYS } from 'modules/GhostTown/player/controls'

export interface GameGuiProviderProps {
    children: React.ReactNode
}

export interface GameGuiContextType {
    openMenu: (menuProps: MenusProps) => void
    closeMenu: (menu: MENUS) => void
    callChallenge: (character?: CHARACTER) => void
    onKeyDown: (gameKeyInput: GAME_KEYS) => void
}

export const GameGuiContext = createContext({
    openMenu: (menuProps: MenusProps) => {},
    closeMenu: (menu: MENUS) => {},
    callChallenge: (character?: CHARACTER) => {},
    onKeyDown: (gameKeyInput: GAME_KEYS) => {},
})

function GameGuiProvider({ children }: GameGuiProviderProps) {
    const router = useRouter()
    const [state, dispatch] = useReducer(gameGuiReducer, gameGuiInitialState)

    const handleOpenMenu = (menuProps: MenusProps) => {
        const action = getActionByMenu(menuProps)
        dispatch(action)
    }

    const handleCloseMenu = (menu: MENUS) => {
        dispatch({ type: ACTIONS.CLOSE_MENU, menu })
    }

    const handleCallChallenge = (character?: CHARACTER) => {
        router.push('/lighthouse')
    }

    const handleOnKeyDown = (gameKeyInput: GAME_KEYS) => {
        dispatch({ type: ACTIONS.UPDATE_KEYS_INPUTS, value: gameKeyInput })
    }

    useEffect(() => {
        menuSubject.notifyDialogMenu(state.dialogMenu, state.isDialogMenuOpen)
        menuSubject.notifyInfoMenu(state.infoMenu, state.isInfoMenuOpen)
    }, [state.dialogMenu, state.infoMenu, state.isDialogMenuOpen, state.isInfoMenuOpen])

    return (
        <GameGuiContext.Provider
            value={{
                openMenu: handleOpenMenu,
                closeMenu: handleCloseMenu,
                callChallenge: handleCallChallenge,
                onKeyDown: handleOnKeyDown,
            }}
        >
            <MenusWrapper
                guiState={state}
                onOpenMenu={handleOpenMenu}
                onCloseMenu={handleCloseMenu}
            />
            {children}
        </GameGuiContext.Provider>
    )
}

export default GameGuiProvider
