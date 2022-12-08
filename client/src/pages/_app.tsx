import { useState } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import AlertProvider from 'common/contexts/AlertContext'
import AuthProvider from 'modules/Auth/contexts/AuthContext'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Head>
                    <title>[WIP] Learning with Ghosts</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <AuthProvider>
                    <AlertProvider>
                        <Component {...pageProps} />
                    </AlertProvider>
                </AuthProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </Hydrate>
        </QueryClientProvider>
    )
}
