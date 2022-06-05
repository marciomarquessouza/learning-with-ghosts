import { LiveMenu } from './LiveMenu'

export interface LiveMenuProps {
    lives: number
    chapterNumber: number
    chapterName: string
    day: number
}

export default function createLiveMenu(props: LiveMenuProps) {
    return new LiveMenu(props)
}
