import Image from 'next/image'

import LogoImg from 'images/logo.png'
import GhostLoaderBodyImg from 'images/ghost-loader-body.png'
import GhostLoaderFloorImg from 'images/ghost-loader-floor-shadow.png'

export default function GhostLoading() {
    return (
        <div className="h-screen m-0 bg-background">
            <div className="flex flex-col h-full">
                <div className="flex-initial">
                    <div className="mt-6 ml-6">
                        <Image src={LogoImg} alt="Logo" />
                    </div>
                </div>
                <div className="flex flex-auto items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <Image
                            src={GhostLoaderBodyImg}
                            className="animate-ghost-levitation"
                            alt="Floating Ghost"
                        />
                        <Image src={GhostLoaderFloorImg} alt="Ghost Loader Floor" />
                        <div className="mt-4">
                            <svg id="progress" viewBox="0 0 200 8" width="200" height="8">
                                <rect fill="#FFFAEF" className="w-64 h-2" opacity="0.5" />
                                <rect fill="#6C63FF" className="animate-progress-bar w-64 h-2" />
                            </svg>
                        </div>
                        <div className="my-4">
                            <p className="font-josefin font-medium text-2xl text-ivory">
                                Looooading....
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
