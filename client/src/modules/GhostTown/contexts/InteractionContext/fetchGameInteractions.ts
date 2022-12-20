import cmsApi from 'config/cms'
import { parseInteractions, RawInteractionData } from '../../utils/parseInteractions'

export async function fetchGameInteractions(chapterNumber?: number) {
    if (!chapterNumber) return null
    const data = await cmsApi(
        `chapters?populate[days][populate][0]=dialogs&filters[chapterNumber]=${chapterNumber}`
    ).json()
    return parseInteractions(data as RawInteractionData)
}
