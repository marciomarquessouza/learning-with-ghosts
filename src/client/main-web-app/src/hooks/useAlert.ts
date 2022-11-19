import { useContext } from 'react'
import { AlertContext } from '../common/contexts/AlertContext'

export function useAlert() {
    const { openAlert, closeAlert } = useContext(AlertContext)

    return { openAlert, closeAlert }
}
