import React from 'react'

import { render } from '@testing-library/react'

import Spinner from '..'

describe('components >> Spinner', () => {
    it('should render the Spinner component properly', () => {
        const { container } = render(<Spinner />)

        expect(container).toMatchSnapshot('Spinner-default')
    })

    it('should render the Spinner component properly with custom lable', () => {
        const { container } = render(<Spinner label="__MOCK__LABEL__" />)

        expect(container).toMatchSnapshot('Spinner-custom-label')
    })
})
