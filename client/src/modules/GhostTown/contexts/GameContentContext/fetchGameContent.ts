import cmsApi from 'config/cms'
import { parseGameContent, RawGameContentData } from '../../utils/parseInteractions'

const CMS_PATH =
    'chapters?populate[days][populate][0]=dialogs&populate[days][populate][1]=challenges&filters[chapterNumber]='

export async function fetchGameContent(chapterNumber?: number) {
    if (!chapterNumber) return null

    const data = await cmsApi(`${CMS_PATH}${chapterNumber}`).json()

    return parseGameContent(data as RawGameContentData)
}
