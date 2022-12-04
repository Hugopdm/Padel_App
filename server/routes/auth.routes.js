const router = require('express').Router()
const bcrypt = require('bcryptjs')

const User = require("../models/User.model")
const saltRounds = 10

const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('./../middleware/jwt.middleware')


router.post('/signup', (req, res, next) => {

    const { email, password, userName, userImageUrl } = req.body

    if (password.length < 3) {
        res.status(400).json({ message: 'La contraseña debe tener más de 4 caracteres.' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: "El usuario ya existe." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, userName, userImageUrl })
        })
        .then((createdUser) => {
            const { email, userName, userImageUrl, _id } = createdUser
            const user = { email, userName, userImageUrl, _id }

            res.status(201).json({ user })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})


router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "Usuario no encontrado." })
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, userName, userImageUrl } = foundUser

                const payload = { _id, email, userName, userImageUrl }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken })
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" })
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})


router.get('/verify', isAuthenticated, (req, res) => {
    res.status(200).json(req.payload)
})


module.exports = router