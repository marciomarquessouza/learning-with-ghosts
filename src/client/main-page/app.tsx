import React from 'react'
import AlertProvider from './contexts/AlertContext'
import AppRouter from './routes/router'

const App = () => {
    return (
        <AlertProvider>
            <AppRouter />
        </AlertProvider>
    )
}

export default App
