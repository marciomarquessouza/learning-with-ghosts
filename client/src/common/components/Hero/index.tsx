import React, { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { User, Chapter } from 'types'

import { PAGES_ROUTERS } from 'const'
import Spinner from '../Spinner'

export interface HeroProps {
    user?: User | null
    chapter?: Chapter | null
}

function Hero({ user, chapter }: HeroProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const isAuthenticated = useMemo(() => !!user, [user])

    const handleGameStart = useCallback(() => {
        setLoading(true)
        const route = isAuthenticated
            ? `${PAGES_ROUTERS.GHOST_TOWN}/${user?.chapter}`
            : PAGES_ROUTERS.REGISTER
        router.push(route)
    }, [router, isAuthenticated, user])

    return (
        <div className="">
            <section className="mx-auto md:mx-4 max-w-7xl lg:px-8 self-center">
                <div className="font-josefin text-white flex flex-col items-start">
                    <div className="text-4xl md:text-6xl font-bold mx-2 text-center md:text-left shadow">
                        <p>{user ? `Welcome back` : `How about learning something new`}</p>
                        <p className="text-primary-light">
                            {user ? `${user.name}` : `while you're having fun?`}
                        </p>
                    </div>
                    <div className="mb-6">
                        <p className="text-lg mx-2 text-center md:text-left shadow">
                            <span className="font-bold">
                                {user ? `Your Level: ` : `Ghost Town `}
                            </span>
                            <span className="font-light">
                                {chapter
                                    ? `Chapter ${chapter.chapterNumber} - ${chapter.title}`
                                    : `is a new way to gamify education using the full power of WebGL`}
                            </span>
                        </p>
                    </div>
                    <div className="my-10 flex flex-col md:flex-row justify-items-center items-center">
                        <button
                            disabled={loading}
                            onClick={handleGameStart}
                            className="inline-flex items-center bg-transparent hover:bg-primary-light text-white font-semibold hover:text-white py-4 px-14 border-4 border-primary-light hover:border-transparent rounded-full"
                        >
                            <span className="text-3xl">{user ? `Start` : `Let's Start`}</span>
                            {loading && <Spinner />}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero
