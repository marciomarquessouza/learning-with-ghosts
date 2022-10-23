import React from 'react'
import { render } from '@testing-library/react'

import Avatar from '..'

describe('components >> Avatar', () => {
    it('should render the Avatar component properly', () => {
        const mockName = '_MOCK_NAME_'
        const mockUrl = '_MOCK_URL_'
        const { container } = render(<Avatar name={mockName} photoUrl={mockUrl} />)

        expect(container).toMatchSnapshot()
    })
})
