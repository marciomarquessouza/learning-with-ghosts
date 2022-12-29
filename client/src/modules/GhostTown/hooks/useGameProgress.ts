import { useContext } from 'react'

import { GameProgressContext } from 'modules/GhostTown/contexts/GameProgressContext'

export function useGameProgress() {
    return useContext(GameProgressContext)
}
