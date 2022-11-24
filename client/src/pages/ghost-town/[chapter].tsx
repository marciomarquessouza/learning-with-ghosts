import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import GhostLoading from 'common/components/GhostLoading'
import GhostTownProvider from 'modules/GhostTown/contexts/GhostTownGUIContext/Provider'
import { useUser } from 'modules/Auth/hooks/useUser'
import { useAlert } from 'common/hooks'
import { ALERTS_TYPE_ENUM } from 'common/contexts/AlertContext'
import { PAGES_ROUTERS } from 'const'

const DynamicComponentCSR = dynamic(() => import('modules/GhostTown'), { ssr: false })

export default function GhostTownPage() {
    const { openAlert } = useAlert()
    const { user, loading, error } = useUser()
    const router = useRouter()

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

    if (!loading && !user) {
        router.push(PAGES_ROUTERS.REGISTER)
    }

    return (
        <>
            {user && (
                <GhostTownProvider>
                    <DynamicComponentCSR user={user} />
                </GhostTownProvider>
            )}
        </>
    )
}
