const router = require("express").Router()

const Product = require('./../models/Product.model')

router.get("/getAllProducts", (req, res) => {

    Product
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get("/getOneProduct/:product_id", (req, res, next) => {

    const { product_id } = req.params

    Coaster
        .findById(product_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post("/saveProduct", (req, res) => {

    Product
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put("/editProduct/:product_id", (req, res, next) => {

    const { productName, category, description, price, imageUrl, owner } = req.body
    const { product_id } = req.params

    Product
        .findByIdAndUpdate(product_id, { productName, category, description, price, imageUrl, owner })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete("/deleteProduct/:product_id", (req, res, next) => {

    const { product_id } = req.params

    Product
        .findByIdAndDelete(product_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})



module.exports = router