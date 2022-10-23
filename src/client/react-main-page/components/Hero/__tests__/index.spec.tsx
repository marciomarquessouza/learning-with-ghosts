import React from 'react'

import { render } from '@testing-library/react'

import Hero from '..'

describe('components >> Hero', () => {
    it('should render the Hero component properly', () => {
        const { container } = render(<Hero />)

        expect(container).toMatchSnapshot('Hero-default')
    })
})
