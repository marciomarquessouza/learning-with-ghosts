import Image from 'next/image'
import LogoImg from 'images/logo.png'

export interface ChapterTitleProps {
    mainTitle: string
    subtitle: string
    chapterNumber: string
}

export default function ChapterTitle({ mainTitle, subtitle, chapterNumber }: ChapterTitleProps) {
    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full animate-chapter-title-out opacity-0">
            <div className="flex h-full">
                <div className="flex flex-col flex-auto items-center justify-center">
                    <Image src={LogoImg} width="124" height="77" alt="Logo" />
                    <div className="relative flex py-2 items-center w-96">
                        <div className="flex-grow border-t border-white"></div>
                    </div>
                    <div className="w-96 my-4">
                        <p className="font-josefin font-normal text-5xl text-ivory uppercase text-center">
                            {mainTitle}
                        </p>
                    </div>
                    <div className="relative flex items-center w-96">
                        <div className="flex-grow border-t border-white"></div>
                        <span className="font-josefin font-light flex-shrink mx-4 text-white text-base">
                            {`Chapter ${chapterNumber}`}
                        </span>
                        <div className="flex-grow border-t border-white"></div>
                    </div>
                    <div className="w-96 mt-2">
                        <p className="font-josefin font-light flex-shrink mx-4 text-white text-lg uppercase text-center">
                            {subtitle}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
