import html from '../../libs/html'

interface LivesIconsProps {
    lives: number
}

export default function createLiveIcons({ lives }: LivesIconsProps): string {
    return [...Array(lives).keys()].map(() => `<img src="/img/live.png" />`).join()
}
