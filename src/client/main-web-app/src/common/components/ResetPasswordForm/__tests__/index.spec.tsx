import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import ResetPasswordForm, { ResetPasswordFormProps } from '..'

describe('components >> ResetPasswordForm', () => {
    const defaultMockedProps: ResetPasswordFormProps = {
        email: '__MOCK__EMAIL__',
        loading: false,
        onChangeEmail: jest.fn(),
        onClickRegister: jest.fn(),
        onSubmit: jest.fn(),
    }

    it('should render the ResetPasswordForm component properly', () => {
        const { container } = render(<ResetPasswordForm {...defaultMockedProps} />)

        expect(container).toMatchSnapshot('ResetPasswordForm-default')
    })

    it('should render the ResetPasswordForm properly in loading state', () => {
        const mockProps = { ...defaultMockedProps, loading: true }
        const { container } = render(<ResetPasswordForm {...mockProps} />)

        expect(container).toMatchSnapshot('ResetPasswordForm-loading')
    })

    it('should fire the onSubmit event when the button submit is pressed', () => {
        const spyOnSubmit = jest.fn()
        const mockedProps = {
            ...defaultMockedProps,
            onSubmit: spyOnSubmit,
        }
        const { getByText } = render(<ResetPasswordForm {...mockedProps} />)

        fireEvent.click(getByText('Send'))

        expect(spyOnSubmit).toHaveBeenCalledTimes(1)
    })

    it('should fire the onClickRegister event when the button submit is pressed', () => {
        const spyOnClickRegister = jest.fn()
        const mockedProps = {
            ...defaultMockedProps,
            onClickRegister: spyOnClickRegister,
        }
        const { getByText } = render(<ResetPasswordForm {...mockedProps} />)

        fireEvent.click(getByText('Register'))

        expect(spyOnClickRegister).toHaveBeenCalledTimes(1)
    })

    it('should fire the onChangeEmail event when the email is entered by the user', () => {
        const spyOnChangeEmail = jest.fn()
        const mockEmail = '__MOCK__EMAIL__'
        const mockedProps = {
            ...defaultMockedProps,
            email: '',
            onChangeEmail: spyOnChangeEmail,
        }
        const { getByPlaceholderText } = render(<ResetPasswordForm {...mockedProps} />)
        fireEvent.change(getByPlaceholderText('Email address'), { target: { value: mockEmail } })

        expect(spyOnChangeEmail).toHaveBeenCalledTimes(1)
        expect(spyOnChangeEmail).toHaveBeenCalledWith(mockEmail)
    })
})
