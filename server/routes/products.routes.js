const router = require("express").Router()

const { response } = require("express")
const { isAuthenticated } = require("../middleware/jwt.middleware")
const Product = require('./../models/Product.model')
const User = require('./../models/User.model')

router.get("/getAllProducts", (req, res, next) => {

    Product
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get("/getOneProduct/:product_id", (req, res, next) => {

    const { product_id } = req.params

    Product
        .findById(product_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post("/saveProduct", isAuthenticated, (req, res, next) => {

    const { productName, category, price, imageUrl, description } = req.body

    Product
        .create({ ...req.body, owner: req.payload._id })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put("/editProduct/:product_id", (req, res, next) => {

    const { productName, category, description, price, imageUrl, owner } = req.body
    const { product_id } = req.params

    Product
        .findByIdAndUpdate(product_id, { productName, category, description, price, imageUrl, owner }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.delete("/deleteProduct/:product_id", (req, res, next) => {

    const { product_id } = req.params

    Product
        .findByIdAndDelete(product_id, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get("/getUserProducts", isAuthenticated, (req, res, next) => {

    Product
        .find({ owner: req.payload._id })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post("/likeProduct/:product_id", isAuthenticated, (req, res, next) => {

    const { product_id } = req.params

    User
        .findByIdAndUpdate(req.payload._id, { $addToSet: { favProduct: product_id } })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post("/unlikeProduct/:product_id", isAuthenticated, (req, res, next) => {

    const { product_id } = req.params

    User
        .findByIdAndUpdate(req.payload._id, { $pull: { favProduct: product_id } })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get("/getLikedProduct", isAuthenticated, (req, res, next) => {


    User
        .findById(req.payload._id)
        .populate('favProduct')
        .then(response => {
            // console.log(response.favProduct)
            res.json(response.favProduct)
        })
        .catch(err => next(err))
})
//-----------------
// router.get("/getFilteredProducts", (req, res, next) => {

//     Product
//         .find()
//         .then(response => res.json(response))
//         .catch(err => next(err))
// })


module.exports = router