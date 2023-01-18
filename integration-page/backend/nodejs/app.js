const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/integration-token', (req, res) => {

    // Your workspace key and secret.
    // You can find them on the Settings page.
    const WORKSPACE_KEY = '03e73c01-5d40-4f2c-9e96-01c4e25290d5'
    const WORKSPACE_SECRET = 'bb6f60cec16d8028a7c411b567d8a4b5358daa3a06c0666f8b40d6cf8e6d86e5'

    const tokenData = {
        // Identifier of user or organization.
        id: 'purejs',
        // Human-readable name (it will simplify troubleshooting)
        name: 'Pure JS',
        // (optional) Any user fields you want to attach to your user.
        fields: {
            userField: 123
        }
    }

    const options = {
        issuer: WORKSPACE_KEY,
        // To prevent token from being used for too long
        expiresIn: 7200,
    }

    const token = jwt.sign(tokenData, WORKSPACE_SECRET, options)

    res.send(JSON.stringify(token))
})

app.listen(8080)