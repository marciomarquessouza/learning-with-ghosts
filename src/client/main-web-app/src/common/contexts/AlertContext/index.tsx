import React, { useState, createContext } from 'react'

import { MESSAGE_TIMEOUT } from '../../../const'

import Alert from '../../components/Alert'

export enum ALERTS_TYPE_ENUM {
    ERROR = 'error',
    SUCCESS = 'success',
}

export const AlertContext = createContext({
    openAlert: (props: { title: string; message: string; type: ALERTS_TYPE_ENUM }) => {},
    closeAlert: () => {},
})

export interface AlertProviderProps {
    children: React.ReactNode
}

function AlertProvider({ children }: AlertProviderProps) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [type, setType] = useState<ALERTS_TYPE_ENUM>(ALERTS_TYPE_ENUM.SUCCESS)

    const handleOpen = (props: { title: string; message: string; type: ALERTS_TYPE_ENUM }) => {
        setTitle(props.title)
        setMessage(props.message)
        setType(props.type)
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, MESSAGE_TIMEOUT)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <AlertContext.Provider value={{ openAlert: handleOpen, closeAlert: handleClose }}>
            <Alert title={title} message={message} open={open} type={type} onClose={handleClose} />
            {children}
        </AlertContext.Provider>
    )
}

export default AlertProvider
