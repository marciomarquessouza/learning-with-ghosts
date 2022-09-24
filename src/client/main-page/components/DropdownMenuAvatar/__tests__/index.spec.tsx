import React from 'react'

import { render, fireEvent, waitFor } from '@testing-library/react'

import DropdownMenuAvatar from '..'

describe('components >> DropdownMenuAvatar', () => {
    const defaultMockedProps = {
        name: '__MOCK__NAME__',
        email: '__MOCK__EMAIL__',
        onLogout: jest.fn(),
    }

    it('should render the DropdownMenuAvatar component properly', () => {
        const { container } = render(<DropdownMenuAvatar {...defaultMockedProps} />)

        expect(container).toMatchSnapshot('DropdownMenuAvatar-default')
    })

    it('should fire the logout event when the Sign Out button is pressed', async () => {
        const mockOnLogout = jest.fn()
        const mockedProps = {
            ...defaultMockedProps,
            onLogout: mockOnLogout,
        }
        const { getByText } = render(<DropdownMenuAvatar {...mockedProps} />)

        fireEvent.click(getByText('MN'))

        await waitFor(() => {
            fireEvent.click(getByText('Sign out'))
        })

        expect(mockOnLogout).toHaveBeenCalledTimes(1)
    })
})
