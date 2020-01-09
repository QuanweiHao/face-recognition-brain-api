const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const database = {
    users: [
        {
            id: '123',
            name: 'Jone',
            email: 'jone@123.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '125',
            name: 'Sally',
            email: 'sally@123.com',
            password: 'banana',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res)=> {
    res.json(database.users)
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0])
    } else {
        res.status(404).json('error logging in')
    }
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body
    database.users.push({
        id: '1234',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            return res.json(user)
        }
    })
    if (!found) {
        res.status(404).json('not found')
    }
})

app.put('/image', (req, res) => {
    const {id} = req.body
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found) {
        res.status(404).json('not found')
    }
})

app.listen(3000, () => {
    console.log("App is running.")
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
 */