import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const DynamicComponentCSR = dynamic(() => import('modules/Lighthouse'), { ssr: false })

export default function LighthousePage() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
    }, [])

    return (
        <div>
            <Head>
                <title>[WIP] Learning with Ghosts</title>
            </Head>

            <div key={Math.random()}></div>
            {loading ? <DynamicComponentCSR /> : null}
        </div>
    )
}
