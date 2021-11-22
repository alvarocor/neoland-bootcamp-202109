require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { registerUser, authenticateUser, retrieveUser, modifyUser, unregisterUser } = require('users')
const jwt = require('jsonwebtoken')

const { env: { PORT, SECRET }, argv: [, , port = PORT || 8000] } = process

const server = express()

const jsonBodyParser = bodyParser.json()

server.post('/api/users', jsonBodyParser, (req, res) => {
    // const name = req.body.name
    // const username = req.body.username
    // const password = req.body.password
    const { body: { name, username, password } } = req

    try {
        registerUser(name, username, password, function (error) {
            if (error) return res.status(409).json({ error: error.message })

            res.status(201).send()
        })
    } catch ({ message }) {
        return res.status(400).json({ error: message })
    }
})

server.post('/api/users/auth', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    try {
        authenticateUser(username, password, (error, id) => {
            if (error) return res.status(401).json({ error: error.message })

            const token = jwt.sign({ sub: id, exp: Math.floor(Date.now() / 1000) + 3600 }, SECRET)

            res.json({ token })
        })
    } catch ({ message }) {
        return res.status(400).json({ error: message })
    }
})

server.get('/api/users', (req, res) => {
    const { headers: { authorization } } = req

    try {
        const [, token] = authorization.split(' ')

        const payload = jwt.verify(token, SECRET)

        const { sub: id } = payload

        retrieveUser(id, (error, user) => {
            if (error) return res.status(404).json({ error: message })

            res.json(user)
        })

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

server.patch("/api/users", jsonBodyParser, (req, res) => {
    const { headers: { authorization }, body: data } = req

    try {
        const [, token] = authorization.split(' ')

        const { sub: id } = jwt.verify(token, SECRET)

        modifyUser(id, data, error => {
            if (error) {
                const { message } = error
                let status = 400

                if (message.includes('User with id does not exists.'))
                    status = 404
                else if (message.includes('Username already exists.'))
                    status = 409
                else if (message.includes('Wrond password.'))
                    status = 401

                return res.status(status).json({ error: error.message })
            }

            res.status(201).send()
        })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

server.delete('/api/users', jsonBodyParser, (req, res) => {
    const { headers: { authorization }, body: { password } } = req

    try {
        const [, token] = authorization.split(' ')

        const { sub: id } = jwt.verify(token, SECRET)

        unregisterUser(id, password, error => {
            if (error) {
                const { message } = error
                let status = 400

                if (message.includes('user with id does not exist'))
                    status = 404
                else if (message.includes('invalid token'))
                    status = 401

                return res.status(status).json({ error: error.message })
            }

            res.status(201).send()
        })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

server.listen(port, () => console.log(`Server up and listening on ${port}`))