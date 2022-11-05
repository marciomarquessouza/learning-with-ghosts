import React from 'react'

import LogoHeader from '..'
import { customRender } from '../../../../test-helpers'

describe('components >> LogoHeader', () => {
    it('should render the LogoHeader component properly', () => {
        const { container } = customRender(<LogoHeader />)
        expect(container).toMatchSnapshot('LogoHeader-default')
    })
})
