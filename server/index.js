require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {SESSION_SECRET, CONNECTION_STRING, SERVER_PORT} = process.env
const ctrl = require('./controller')

const app = express()

app.use(express.json())

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30,
        }
    })
)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false},
    }).then((db) => {
        app.set('db', db)
        console.log('Database is online')
    }).catch(err => console.log(`Database error: ${err}`))

    //endpoints
    app.get('/auth/user', ctrl.getUser)
    app.post('/auth/register', ctrl.register)
    app.post('/auth/login', ctrl.login)
    app.post('/auth/logout', ctrl.logout)


    app.listen(SERVER_PORT, () => console.log(`<-----SERVER IS ONLINE----->`))