import cmsApi from 'config/cms'
import { useQuery } from 'react-query'

async function fetchGameInteractions(chapterNumber?: number) {
    if (!chapterNumber) return null
    const data = await cmsApi(
        `chapters?populate[days][populate][0]=dialogs&filters[chapterNumber]=${chapterNumber}`
    ).json()
    return data
}

function useGameInteraction(chapterNumber?: number) {
    return useQuery({
        queryKey: ['interactions', chapterNumber],
        queryFn: () => fetchGameInteractions(chapterNumber),
        enabled: !!chapterNumber,
    })
}

export { fetchGameInteractions, useGameInteraction }
