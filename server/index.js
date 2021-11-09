import path from 'path'
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

import App from '../src/App'

const app = express()

const PORT = 3000

app.use('/static', express.static(path.join(__dirname, "..", "public")))

app.use('*', (req, res) => {
    const content = ReactDOMServer.renderToString(
        <StaticRouter location={req.url}>
            <App />
        </StaticRouter>
    )
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ReactFromScratch - SSR</title>
        </head>
        <body>
            <div id="root">
                ${content}
            </div>
            <script src="./static/bundle.js"></script>
        </body>
        </html>
    `
    res.send(html)
})

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`)
})