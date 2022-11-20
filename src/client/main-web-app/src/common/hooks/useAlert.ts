import { useContext } from 'react'
import { AlertContext } from '../contexts/AlertContext'

export function useAlert() {
    const { openAlert, closeAlert } = useContext(AlertContext)

    return { openAlert, closeAlert }
}
