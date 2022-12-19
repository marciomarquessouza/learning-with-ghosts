import { useContext } from 'react'

import { GhostTownGUIContext } from 'modules/GhostTown/contexts/GhostTownGUIContext'

export function useGhostTownGui() {
    return useContext(GhostTownGUIContext)
}
