import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import { User } from 'firebase/auth'

import { customRender } from '../../../test-helpers'

import Home from '..'

describe('pages >> Home', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should render the Home page properly', () => {
        const { container } = customRender(<Home />)
        expect(container).toMatchSnapshot('Home-default')
    })

    it('should render the Home page properly when loading', () => {
        const { container } = customRender(<Home />, { auth: { loading: true } })
        expect(container).toMatchSnapshot('Home-loading')
    })

    it('should render the Home page properly with user signed', () => {
        const mockUser = {
            uid: '__MOCK__UID__',
            email: '__MOCK__EMAIL__',
        } as User
        const { container } = customRender(<Home />, { auth: { user: mockUser } })
        expect(container).toMatchSnapshot('Home-signed')
    })

    it('should redirect to Login page when the Login button is pressed', async () => {
        const { getByText, history } = customRender(<Home />)

        expect(history.location.pathname).toBe('/')

        await waitFor(() => {
            fireEvent.click(getByText('LOGIN'))
        })

        expect(history.location.pathname).toBe('/login')
    })

    it('should fire the logout event when the Logout button is pressed', async () => {
        const spySignOut = jest.fn()
        const mockUser = {
            uid: '__MOCK__UID__',
            email: '__MOCK__EMAIL__',
        } as User

        const { getByText, container } = customRender(<Home />, {
            auth: { user: mockUser, signOut: spySignOut },
        })

        await waitFor(() => {
            fireEvent.click(getByText('U'))
        })

        await waitFor(() => {
            fireEvent.click(getByText('Logout'))
        })

        expect(spySignOut).toHaveBeenCalledTimes(1)

        expect(container).toMatchSnapshot('Home-opened-menu')
    })
})
