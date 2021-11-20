import path from 'path'
import express from 'express'
import React from 'react'
import * as fs from 'fs'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

import App from '../src/App'

const app = express()

const PORT = 3000

app.use('/static', express.static(path.join(__dirname, "..", "public/assets")))

app.use('*', (req, res) => {
    const indexFile = path.resolve(__dirname, '../public/index.html')
    const content = ReactDOMServer.renderToString(
        <StaticRouter location={req.originalUrl}>
            <App />
        </StaticRouter>
    )
    fs.readFile(indexFile, 'UTF-8', (err, data) => {
        if(err) {
            console.error('Could not read file!', err)
            return res.json({success: false, message: 'Something went wrong!'})
        }

        return res.send(data.replace('<div id="root"></div>', `<div id="root">${content}</div>`))
    })
})

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`)
})