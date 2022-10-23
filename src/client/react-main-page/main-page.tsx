import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'

import '../styles.css'

const container = document.getElementById('root')

if (!container) {
    throw new Error('Element with "root" id is missing in the document')
}

const root = createRoot(container)
root.render(<App />)
