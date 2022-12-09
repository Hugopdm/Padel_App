const router = require('express').Router()
const bcrypt = require('bcryptjs')

const User = require("../models/User.model")


const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('./../middleware/jwt.middleware')

router.post('/signup', (req, res, next) => {

    const { email, password, userName, imageUrl } = req.body


    User
        .create({ email, password, userName, imageUrl })
        .then((createdUser) => {

            const { email, userName, imageUrl, _id } = createdUser
            const user = { email, userName, imageUrl, _id }

            res.status(201).json({ user })
        })
        .catch(err => next(err))
})


router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ errorMessages: ['Indica Email y Contraseña'] })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ errorMessages: ['Usuario no encontrado'] })
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, userName, imageUrl } = foundUser

                const payload = { _id, email, userName, imageUrl }

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