import React from 'react'

import { render, fireEvent, waitFor } from '@testing-library/react'
import { User } from 'firebase/auth'

import DropdownMenuMobile from '..'

describe('components >> DropdownMenuMobile', () => {
    const defaultMockedProps = {
        user: null,
        onLogin: jest.fn(),
        onLogout: jest.fn(),
        onPressAboutMe: jest.fn(),
    }

    it('should render the DropdownMenuMobile component properly', () => {
        const { container } = render(<DropdownMenuMobile {...defaultMockedProps} />)

        expect(container).toMatchSnapshot('DropdownMenuMobile-default')
    })

    it('should render the DropdownMenuMobile component properly when the user is signed', () => {
        const mockedProps = {
            ...defaultMockedProps,
            user: { uid: '__MOCK__USER__' } as User,
        }
        const { container } = render(<DropdownMenuMobile {...mockedProps} />)

        expect(container).toMatchSnapshot('DropdownMenuMobile-signed')
    })

    it('should render the DropdownMenuMobile component properly when the dropdown menu is open', async () => {
        const mockedProps = { ...defaultMockedProps }
        const { getByRole, container } = render(<DropdownMenuMobile {...mockedProps} />)

        await waitFor(() => {
            fireEvent.click(getByRole('button'))
        })

        expect(container).toMatchSnapshot('DropdownMenuMobile-opened')
    })

    it('should render the DropdownMenuMobile component properly when the dropdown menu is open and the user is signed', async () => {
        const mockedProps = { ...defaultMockedProps, user: { uid: '__MOCK__USER__' } as User }
        const { getByRole, container } = render(<DropdownMenuMobile {...mockedProps} />)

        await waitFor(() => {
            fireEvent.click(getByRole('button'))
        })

        expect(container).toMatchSnapshot('DropdownMenuMobile-opened')
    })

    it('should fire the onPressAboutMe event when the About button is pressed', async () => {
        const spyOnPressAboutMe = jest.fn()
        const mockedProps = {
            ...defaultMockedProps,
            onPressAboutMe: spyOnPressAboutMe,
        }
        const { getByRole, getByText } = render(<DropdownMenuMobile {...mockedProps} />)

        await waitFor(() => {
            fireEvent.click(getByRole('button'))
        })

        await waitFor(() => {
            fireEvent.click(getByText('About'))
        })

        expect(spyOnPressAboutMe).toHaveBeenCalledTimes(1)
    })

    it('should fire the onLogin event when the Login button is pressed', async () => {
        const spyOnLogin = jest.fn()
        const mockedProps = {
            ...defaultMockedProps,
            onLogin: spyOnLogin,
        }
        const { getByRole, getByText } = render(<DropdownMenuMobile {...mockedProps} />)

        await waitFor(() => {
            fireEvent.click(getByRole('button'))
        })

        await waitFor(() => {
            fireEvent.click(getByText('Login'))
        })

        expect(spyOnLogin).toHaveBeenCalledTimes(1)
    })

    it('should fire the onLogout event when the Logout button is pressed', async () => {
        const spyOnLogout = jest.fn()
        const mockedProps = {
            ...defaultMockedProps,
            onLogout: spyOnLogout,
            user: { uid: '__MOCK__USER__' } as User,
        }
        const { getByRole, getByText } = render(<DropdownMenuMobile {...mockedProps} />)

        await waitFor(() => {
            fireEvent.click(getByRole('button'))
        })

        await waitFor(() => {
            fireEvent.click(getByText('Logout'))
        })

        expect(spyOnLogout).toHaveBeenCalledTimes(1)
    })
})
