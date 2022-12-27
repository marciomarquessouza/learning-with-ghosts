import dynamic from 'next/dynamic'

import { useAlert } from 'common/hooks/useAlert'
import { useUser } from 'modules/Auth/hooks/useUser'
import { useGameContent } from 'modules/GhostTown/hooks/useGameContent'
import { ALERTS_TYPE_ENUM } from 'common/contexts/AlertContext'
import GhostLoading from 'common/components/GhostLoading'
import GameGuiProvider from 'modules/GhostTown/contexts/GameGuiContext'

const DynamicComponentCSR = dynamic(() => import('modules/GhostTown'), { ssr: false })

export default function GhostTownPage() {
    const { openAlert } = useAlert()
    const { user, loading, error } = useUser()
    const { chapter } = useGameContent()

    if (error && !loading) {
        openAlert({
            title: 'Error',
            message: 'Error loading the content. Please, try again later',
            type: ALERTS_TYPE_ENUM.ERROR,
        })
    }

    if (loading) {
        return <GhostLoading />
    }

    return (
        <>
            {user && (
                <GameGuiProvider>
                    <DynamicComponentCSR user={user} chapter={chapter} />
                </GameGuiProvider>
            )}
        </>
    )
}
