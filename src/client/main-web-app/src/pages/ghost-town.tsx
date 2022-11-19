import GhostTown from 'modules/GhostTown'

import GhostTownProvider from '../modules/GhostTown/contexts/GhostTownGUIContext/GhostTownGUIProvider'

export default function IslandMapPage() {
    return (
        <GhostTownProvider>
            <GhostTown />
        </GhostTownProvider>
    )
}
