import React from 'react'

import { render } from '@testing-library/react'

import LogoHeader from '..'

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}))

describe('components >> LogoHeader', () => {
    it('should render the LogoHeader component properly', () => {
        const { container } = render(<LogoHeader />)
        expect(container).toMatchSnapshot('LogoHeader-default')
    })
})
