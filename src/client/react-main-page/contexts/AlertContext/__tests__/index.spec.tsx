import React, { useContext } from 'react'

import { render, fireEvent } from '@testing-library/react'

import { AlertContext, ALERTS_TYPE_ENUM } from '..'

function Component() {
    const { openAlert, closeAlert } = useContext(AlertContext)
    return (
        <>
            <button
                onClick={() =>
                    openAlert({
                        title: '__MOC__TITLE__B__',
                        message: '__MOC__MESSAGE_B__',
                        type: ALERTS_TYPE_ENUM.ERROR,
                    })
                }
            >
                Open
            </button>
            <button onClick={closeAlert}>Close</button>
        </>
    )
}

describe('contexts >> AlertContext', () => {
    const spyOpen = jest.fn()
    const spyClose = jest.fn()

    it('should call the provided functions', () => {
        const { getByText, container } = render(
            <AlertContext.Provider
                value={{
                    openAlert: spyOpen,
                    closeAlert: spyClose,
                }}
            >
                <Component />
            </AlertContext.Provider>
        )

        fireEvent.click(getByText('Open'))
        fireEvent.click(getByText('Close'))

        expect(spyOpen).toBeCalledTimes(1)
        expect(spyClose).toBeCalledTimes(1)

        expect(container).toMatchSnapshot('with-provider')
    })
    it('should call the default values', () => {
        const { getByText, container } = render(<Component />)
        fireEvent.click(getByText('Open'))
        fireEvent.click(getByText('Close'))

        expect(spyOpen).toBeCalledTimes(1)
        expect(spyClose).toBeCalledTimes(1)

        expect(container).toMatchSnapshot('without-provider')
    })
})
