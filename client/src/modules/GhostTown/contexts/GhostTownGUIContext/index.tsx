import React, { createContext, useCallback, useReducer, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'

import { CHARACTER } from 'modules/GhostTown/const'
import { ghostTownGuiReducer } from './reducers/ghostTownGuiReducer'
import { ghostTownGuiInitialState } from './reducers/ghostTownGuiInitialState'
import { ACTIONS, MENUS, MenusProps } from 'types/GhostTownGui'
import { menuSubject } from 'modules/GhostTown/observers'
import getActionByMenu from './utils/getActionByMenu'

import MenusWrapper from 'modules/GhostTown/components/MenusWrapper'
import { GAME_KEYS } from 'modules/GhostTown/player/controls'

export interface GhostTownGUIProviderProps {
    children: React.ReactNode
}

export interface GhostTownGuiContextType {
    openMenu: (menuProps: MenusProps) => void
    closeMenu: (menu: MENUS) => void
    setLives: (lives: number) => void
    callChallenge: (character?: CHARACTER) => void
    onKeyDown: (gameKeyInput: GAME_KEYS) => void
}

export const GhostTownGUIContext = createContext({
    openMenu: (menuProps: MenusProps) => {},
    closeMenu: (menu: MENUS) => {},
    setLives: (lives: number) => {},
    callChallenge: (character?: CHARACTER) => {},
    onKeyDown: (gameKeyInput: GAME_KEYS) => {},
})

function GhostTownGUIProvider({ children }: GhostTownGUIProviderProps) {
    const router = useRouter()
    const [state, dispatch] = useReducer(ghostTownGuiReducer, ghostTownGuiInitialState)

    const setLives = (lives: number) => {
        dispatch({ type: ACTIONS.SET_LIVES, lives })
    }

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
        <GhostTownGUIContext.Provider
            value={{
                setLives,
                openMenu: handleOpenMenu,
                closeMenu: handleCloseMenu,
                callChallenge: handleCallChallenge,
                onKeyDown: handleOnKeyDown,
            }}
        >
            <MenusWrapper guiState={state} onCloseMenu={handleCloseMenu} />
            {children}
        </GhostTownGUIContext.Provider>
    )
}

export default GhostTownGUIProvider
