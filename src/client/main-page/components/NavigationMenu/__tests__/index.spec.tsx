import React from 'react'
import { User } from 'firebase/auth'
import { render, fireEvent } from '@testing-library/react'

import NavigationMenu from '..'
import { GITHUB_URL } from '../../../const'

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    Link: () => <a />,
}))

describe('components >> NavigationMenu', () => {
    const defaultMockedProps = {
        user: undefined,
        onLogout: jest.fn(),
        onLogin: jest.fn(),
    }

    it('should render the NavigationMenu component properly', () => {
        const { container } = render(<NavigationMenu {...defaultMockedProps} />)

        expect(container).toMatchSnapshot('NavigationMenu-default')
    })

    it('should render the NavigationMenu component properly when the user is signed', () => {
        const mockedProps = { ...defaultMockedProps, user: { uid: '__MOCK__ID__' } as User }
        const { container } = render(<NavigationMenu {...mockedProps} />)

        expect(container).toMatchSnapshot('NavigationMenu-user')
    })

    it('should should fire the window event open when the ABOUT link is pressed', () => {
        global.open = jest.fn()
        const mockedProps = { ...defaultMockedProps }
        const { getByText } = render(<NavigationMenu {...mockedProps} />)

        fireEvent.click(getByText('ABOUT'))

        expect(global.open).toHaveBeenCalledTimes(1)
        expect(global.open).toHaveBeenCalledWith(GITHUB_URL, '_blank')
    })
})
