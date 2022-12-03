const router = require("express").Router()

const Product = require('./../models/Product.model')

router.get("/getProducts", (req, res) => {

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


module.exports = router