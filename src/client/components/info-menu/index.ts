import { InfoMenu } from './InfoMenu'

export interface InfoMenuProps {
    avatar: string
    title: string
    onClickTalk: () => void
}

export default function createInfoMenu(props: InfoMenuProps) {
    return new InfoMenu(props)
}
