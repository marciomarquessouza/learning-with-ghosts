import { useGameContent } from 'modules/GhostTown/hooks/useGameContent'
import { useGameProgress } from 'modules/GhostTown/hooks/useGameProgress'
import Image from 'next/image'

export interface LiveMenuProps {
    isLiveMenuOpen?: boolean
}

export default function LiveMenu({ isLiveMenuOpen = false }: LiveMenuProps) {
    const { gameProgress } = useGameProgress()
    const { chapter } = useGameContent()
    if (!isLiveMenuOpen) {
        return null
    }

    return (
        <div id="live-menu" className="fixed top-0 right-0 z-40">
            <div className="flex flex-col flex-auto items-end justify-start py-4 pr-6">
                <div className="flex flex-row">
                    {[...Array(gameProgress.lives)].map((_, index) => (
                        <Image
                            src="/img/live.png"
                            width={48}
                            height={51}
                            key={index}
                            alt="Ghost Live indicator"
                        />
                    ))}
                </div>
                <p className="font-josefin font-light flex-shrink mx-4 text-white">
                    <span className="font-medium">{`Chapter ${chapter?.chapterNumber}:`} </span>
                    <span className="font-light uppercase">{chapter?.title}</span>
                </p>
                <p className="font-josefin font-medium flex-shrink mx-4 text-primary-light text-base">
                    {`DAY ${gameProgress.day}`}
                </p>
            </div>
        </div>
    )
}
