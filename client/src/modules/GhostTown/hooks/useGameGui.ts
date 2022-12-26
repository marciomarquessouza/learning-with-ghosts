import { useContext } from 'react'

import { GameGuiContext } from 'modules/GhostTown/contexts/GameGuiContext'

export function useGameGui() {
    return useContext(GameGuiContext)
}
