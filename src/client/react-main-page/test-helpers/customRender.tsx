import React from 'react'

import { Router } from 'react-router-dom'
import { render, RenderOptions } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut, User } from 'firebase/auth'
import AlertProvider from '../contexts/AlertContext'

interface CustomRenderOptions {
    wrappers?: RenderOptions
    navigation?: {
        initialEntries?: string[]
    }
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
    { navigation, wrappers, auth, alerts }: CustomRenderOptions = {}
) => {
    const initialEntries = navigation?.initialEntries || ['/']
    const history = createMemoryHistory({ initialEntries })
    ;(useAuthState as jest.Mock).mockImplementation(() => [auth?.user, !!auth?.loading])
    ;(signOut as jest.Mock).mockImplementation(auth?.signOut || jest.fn())

    return {
        history,
        ...render(
            <AlertProvider>
                <Router location={history.location} navigator={history}>
                    {ui}
                </Router>
            </AlertProvider>,
            wrappers
        ),
    }
}
