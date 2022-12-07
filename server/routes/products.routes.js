const router = require("express").Router()

const { isAuthenticated } = require("../middleware/jwt.middleware")
const Product = require('./../models/Product.model')

router.get("/getAllProducts", (req, res) => {

    Product
        .find()
        .select({ productName: 1, imageUrl: 1 })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(response))
})

router.get("/getOneProduct/:product_id", (req, res, next) => {

    const { product_id } = req.params

    Product
        .findById(product_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post("/saveProduct", isAuthenticated, (req, res) => {

    const { productName, category, price, imageUrl, description } = req.body

    Product
        .create({ ...req.body, owner: req.payload._id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put("/editProduct/:product_id", (req, res, next) => {

    const { productName, category, description, price, imageUrl, owner } = req.body
    const { product_id } = req.params

    Product
        .findByIdAndUpdate(product_id, { productName, category, description, price, imageUrl, owner }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete("/deleteProduct/:product_id", (req, res, next) => {

    const { product_id } = req.params

    Product
        .findByIdAndDelete(product_id, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get("/getUserProducts", isAuthenticated, (req, res) => {

    Product
        .find({ owner: req.payload._id })
        .select({ productName: 1, imageUrl: 1 })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(response))
})



module.exports = router