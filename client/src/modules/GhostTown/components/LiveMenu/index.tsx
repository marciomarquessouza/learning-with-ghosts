import Image from 'next/image'

export interface LiveMenuProps {
    isLiveMenuOpen?: boolean
    lives: number
    chapterNumber: number
    chapterName: string
    day: number
}

export const LIVE_MENU_DEFAULT: LiveMenuProps = {
    lives: 5,
    chapterNumber: 1,
    chapterName: '',
    day: 1,
}

export default function LiveMenu({
    lives,
    chapterNumber,
    chapterName,
    day,
    isLiveMenuOpen = false,
}: LiveMenuProps) {
    if (!isLiveMenuOpen) {
        return null
    }

    return (
        <div
            id="live-menu"
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 w-full md:inset-0 h-modal md:h-full"
        >
            <div className="flex flex-col flex-auto items-end justify-start py-4 pr-6">
                <div className="flex flex-row">
                    {[...Array(lives)].map((_, index) => (
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
                    <span className="font-medium">{`Chapter ${chapterNumber}:`} </span>
                    <span className="font-light uppercase">{chapterName}</span>
                </p>
                <p className="font-josefin font-medium flex-shrink mx-4 text-primary-light text-base">
                    {`DAY ${day}`}
                </p>
            </div>
        </div>
    )
}
