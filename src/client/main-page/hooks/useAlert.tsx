import { useContext } from 'react'
import { AlertContext } from '../contexts/AlertContext'

function useAlert() {
    const { openAlert, closeAlert } = useContext(AlertContext)

    return { openAlert, closeAlert }
}

export default useAlert
