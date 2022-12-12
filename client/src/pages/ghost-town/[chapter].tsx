import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import GhostLoading from 'common/components/GhostLoading'
import GhostTownProvider from 'modules/GhostTown/contexts/GhostTownGUIContext/Provider'
import { useUser } from 'modules/Auth/hooks/useUser'
import { useAlert } from 'common/hooks/useAlert'
import { ALERTS_TYPE_ENUM } from 'common/contexts/AlertContext'
import { useGameInteraction } from 'modules/GhostTown/hooks/useGameInteractions'

const DynamicComponentCSR = dynamic(() => import('modules/GhostTown'), { ssr: false })

export default function GhostTownPage() {
    const { openAlert } = useAlert()
    const { user, loading, error } = useUser()
    const router = useRouter()
    const { chapter } = useGameInteraction()

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
                <GhostTownProvider>
                    <DynamicComponentCSR user={user} chapter={chapter} />
                </GhostTownProvider>
            )}
        </>
    )
}

// export const getStaticProps: GetStaticProps = async (context) => {
//     const chapter = context.params?.chapter as string
//     const queryClient = new QueryClient()

//     await queryClient.prefetchQuery(['interactions', chapter], () => fetchGameInteractions(chapter))

//     return {
//         props: {
//             dehydratedState: dehydrate(queryClient),
//         },
//     }
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//     return {
//         paths: [],
//         fallback: 'blocking',
//     }
// }