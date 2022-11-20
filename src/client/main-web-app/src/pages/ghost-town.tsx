import GhostTown from 'modules/GhostTown'

import GhostTownProvider from '../modules/GhostTown/contexts/GhostTownGUIContext/Provider'

export default function IslandMapPage() {
    return (
        <GhostTownProvider>
            <GhostTown />
        </GhostTownProvider>
    )
}
