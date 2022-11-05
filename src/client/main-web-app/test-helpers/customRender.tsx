import React from 'react'

import { RouterContext } from 'next/dist/shared/lib/router-context'
import { NextRouter } from 'next/router'
import { render, RenderOptions } from '@testing-library/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut, User } from 'firebase/auth'
import AlertProvider from '../src/contexts/AlertContext'

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
    return {
        basePath: '',
        pathname: '/',
        route: '/',
        query: {},
        asPath: '/',
        back: jest.fn(),
        beforePopState: jest.fn(),
        prefetch: jest.fn(),
        push: jest.fn(),
        reload: jest.fn(),
        replace: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
        isFallback: false,
        isLocaleDomain: false,
        isReady: true,
        defaultLocale: 'en',
        domainLocales: [],
        isPreview: false,
        ...router,
    }
}

interface CustomRenderOptions {
    wrappers?: RenderOptions
    auth?: {
        user?: User | null
        loading?: boolean
        signOut?: jest.Mock
    }
    alerts?: {
        openAlert?: jest.Mock
        closeAlert?: jest.Mock
    }
}

export const customRender = (
    ui: React.ReactElement,
    { wrappers, auth, alerts }: CustomRenderOptions = {}
) => {
    ;(useAuthState as jest.Mock).mockImplementation(() => [auth?.user, !!auth?.loading])
    ;(signOut as jest.Mock).mockImplementation(auth?.signOut || jest.fn())
    const router = createMockRouter({})

    return {
        router,
        ...render(
            <AlertProvider>
                <RouterContext.Provider value={router}>{ui}</RouterContext.Provider>
            </AlertProvider>,
            wrappers
        ),
    }
}
