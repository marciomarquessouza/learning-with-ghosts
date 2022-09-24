import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import SocialMediaLogin, { SocialMediaLoginProps } from '..'

describe('components >> SocialMediaLogin', () => {
    const defaultMockedProps: SocialMediaLoginProps = {
        onClick: jest.fn(),
    }

    it('should render the ResetPasswordForm component properly', () => {
        const { container } = render(<SocialMediaLogin {...defaultMockedProps} />)

        expect(container).toMatchSnapshot('SocialMediaLogin-default')
    })

    it('should fire the onClick event with twitter as target when the Twitter button is pressed', () => {
        const spyOnClick = jest.fn()
        const mockedProps: SocialMediaLoginProps = { ...defaultMockedProps, onClick: spyOnClick }
        const { getByRole } = render(<SocialMediaLogin {...mockedProps} />)

        fireEvent.click(getByRole('button', { name: /twitter/i }))

        expect(spyOnClick).toHaveBeenCalledTimes(1)
        expect(spyOnClick).toHaveBeenCalledWith('twitter')
    })

    it('should fire the onClick event with google as target when the Google button is pressed', () => {
        const spyOnClick = jest.fn()
        const mockedProps: SocialMediaLoginProps = { ...defaultMockedProps, onClick: spyOnClick }
        const { getByRole } = render(<SocialMediaLogin {...mockedProps} />)

        fireEvent.click(getByRole('button', { name: /google/i }))

        expect(spyOnClick).toHaveBeenCalledTimes(1)
        expect(spyOnClick).toHaveBeenCalledWith('google')
    })
})
