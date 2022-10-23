import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import RegisterForm, { RegisterFormProps } from '..'

describe('components >> RegisterForm', () => {
    const defaultMockedProps: RegisterFormProps = {
        email: '__MOCK__EMAIL__',
        password: '__MOCK__PASSWORD__',
        name: '__MOCK__NAME__',
        loading: false,
        onChangeEmail: jest.fn(),
        onChangePassword: jest.fn(),
        onChangeName: jest.fn(),
        onSubmit: jest.fn(),
    }

    it('should render the RegisterForm component properly', () => {
        const { container } = render(<RegisterForm {...defaultMockedProps} />)

        expect(container).toMatchSnapshot('RegisterForm-default')
    })

    it('should render the RegisterForm component  properly in loading state', () => {
        const mockProps = { ...defaultMockedProps, loading: true }
        const { container } = render(<RegisterForm {...mockProps} />)

        expect(container).toMatchSnapshot('RegisterForm-loading')
    })

    it('should fire the onSubmit event when the button submit is pressed', () => {
        const spyOnSubmit = jest.fn()
        const mockedProps = {
            ...defaultMockedProps,
            onSubmit: spyOnSubmit,
        }
        const { getByText } = render(<RegisterForm {...mockedProps} />)

        fireEvent.click(getByText('Register'))

        expect(spyOnSubmit).toHaveBeenCalledTimes(1)
    })

    it('should fire the onChangeEmail event when the email is entered by the user', () => {
        const spyOnChangeEmail = jest.fn()
        const mockEmail = '__MOCK__EMAIL__'
        const mockedProps = {
            ...defaultMockedProps,
            email: '',
            onChangeEmail: spyOnChangeEmail,
        }
        const { getByPlaceholderText } = render(<RegisterForm {...mockedProps} />)
        fireEvent.change(getByPlaceholderText('Email address'), { target: { value: mockEmail } })

        expect(spyOnChangeEmail).toHaveBeenCalledTimes(1)
        expect(spyOnChangeEmail).toHaveBeenCalledWith(mockEmail)
    })

    it('should fire the onChangePassword event when the password is entered by the user', () => {
        const spyOnChangePassword = jest.fn()
        const mockPassword = '__MOCK__PASSWORD__'
        const mockedProps = {
            ...defaultMockedProps,
            password: '',
            onChangePassword: spyOnChangePassword,
        }
        const { getByPlaceholderText } = render(<RegisterForm {...mockedProps} />)
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: mockPassword } })

        expect(spyOnChangePassword).toHaveBeenCalledTimes(1)
        expect(spyOnChangePassword).toHaveBeenCalledWith(mockPassword)
    })

    it('should fire the onChangeName event when the name is entered by the user', () => {
        const spyOnChangeName = jest.fn()
        const mockName = '__MOCK__NAME__'
        const mockedProps = {
            ...defaultMockedProps,
            name: '',
            onChangeName: spyOnChangeName,
        }
        const { getByPlaceholderText } = render(<RegisterForm {...mockedProps} />)
        fireEvent.change(getByPlaceholderText('Name'), { target: { value: mockName } })

        expect(spyOnChangeName).toHaveBeenCalledTimes(1)
        expect(spyOnChangeName).toHaveBeenCalledWith(mockName)
    })
})
