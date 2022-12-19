import React, { createContext, useCallback, useReducer, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'

import { CHARACTER } from 'modules/GhostTown/const'
import { ghostTownGuiReducer } from './reducers/ghostTownGuiReducer'
import { ghostTownGuiInitialState } from './reducers/ghostTownGuiInitialState'
import { ACTIONS, MENUS, MenusProps } from 'types/GhostTownGui'
import { menuSubject } from 'modules/GhostTown/observers'
import getActionByMenu from './utils/getActionByMenu'

import MenusWrapper from 'modules/GhostTown/components/MenusWrapper'

export interface GhostTownGUIProviderProps {
    children: React.ReactNode
}

export const GhostTownGUIContext = createContext({
    openMenu: (menuProps: MenusProps) => {},
    closeMenu: (menu: MENUS) => {},
    setLives: (lives: number) => {},
    callChallenge: (character?: CHARACTER) => {},
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

    useEffect(() => {
        const { dialogMenu, infoMenu, isDialogMenuOpen, isInfoMenuOpen } = state
        menuSubject.notifyDialogMenu(dialogMenu, isDialogMenuOpen)
        menuSubject.notifyInfoMenu(infoMenu, isInfoMenuOpen)
    }, [state])

    return (
        <GhostTownGUIContext.Provider
            value={{
                setLives,
                openMenu: handleOpenMenu,
                closeMenu: handleCloseMenu,
                callChallenge: handleCallChallenge,
            }}
        >
            <MenusWrapper guiState={state} onCloseMenu={handleCloseMenu} />
            {children}
        </GhostTownGUIContext.Provider>
    )
}

export default GhostTownGUIProvider
