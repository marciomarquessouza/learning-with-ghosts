import Image from 'next/image'

function SideHero() {
    return (
        <div className="hidden grow-0 shrink-1 md:shrink-0 basis-auto xl:w-4/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0 md:flex items-center justify-center">
            <Image src="/img/login-logo.png" width={266} height={389} alt="Ghost Logo" />
        </div>
    )
}

export default SideHero
