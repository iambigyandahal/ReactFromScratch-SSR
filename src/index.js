import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import './index.scss'

const container = document.getElementById('root')
const root = ReactDOM.hydrateRoot(container,
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode> 
)