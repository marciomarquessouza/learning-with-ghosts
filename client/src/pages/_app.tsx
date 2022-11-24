import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/globals.css'
import AlertProvider from 'common/contexts/AlertContext'
import AuthProvider from 'modules/Auth/contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Head>
                <title>[WIP] Learning with Ghosts</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <AlertProvider>
                <Component {...pageProps} />
            </AlertProvider>
        </AuthProvider>
    )
}
