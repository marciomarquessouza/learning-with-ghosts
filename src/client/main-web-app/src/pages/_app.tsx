import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/globals.css'
import AlertProvider from '../contexts/AlertContext'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>[WIP] Learning with Ghosts</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <AlertProvider>
                <Component {...pageProps} />
            </AlertProvider>
        </>
    )
}
