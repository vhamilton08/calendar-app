const bcrypt = require('bcryptjs')

module.exports = {
    
    getUser: (req, res) => {
        if(req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    register: async (req, res) => {
        const {username, password} =req.body
        const db = req.app.get('db')
        let foundUser = await db.users.get_user([username])
        if(foundUser[0]) {
            res.status(409).send(`username is taken`)
        } else {
            const salt = bcrypt.genSaltSync(15)
            const hash = bcrypt.hashSync(password, salt)
            const newUser = await db.users.add_user([username, hash])
            req.session.user = newUser[0]
            res.status(201).send(req.session.user)
        }
    },

    login: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')
        let foundUser = await db.get.users.get_user([username])
        foundUser = foundUser[0]
        if(foundUser) {
            const compareHash = foundUser.password
            const authenticated = bcrypt.compareSync(password, compareHash)
            if(authenticated) {
            delete foundUser.password
            req.session.user = foundUser
            res.status(202).send(foundUser)
            } else {
                res.status(401).send(`Incorrect username or password`)
            }
        } else {
            res.status(401).send(`Incorrect username or password`)
        }

    }
}