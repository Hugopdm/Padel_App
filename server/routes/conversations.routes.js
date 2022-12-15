const router = require("express").Router()

const { response } = require("express")
const { isAuthenticated } = require("../middleware/jwt.middleware")
const Conversation = require("../models/Conversation.model")
const Product = require('./../models/Product.model')


router.post("/createConversation/:product_id", isAuthenticated, (req, res, next) => {

    const { product_id } = req.params

    Product
        .findById(product_id)
        .select({ owner: 1 })
        .then(({ owner: productOwner }) => Conversation.create({ product: product_id, productOwner, user: req.payload._id }))
        .then(conversation => res.json(conversation))
        .catch(err => next(err))
})

router.put("/addMessage/:conversation_id", isAuthenticated, (req, res, next) => {

    const { conversation_id } = req.params
    const { message } = req.body

    Conversation
        .findByIdAndUpdate(conversation_id, { $push: { messages: { message, writer: req.payload._id } } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get("/getMessages/:conversation_id", (req, res, next) => {

    const { conversation_id } = req.params

    Conversation
        .findById(conversation_id)
        .select({ messages: 1, _id: 0 })
        .populate({
            path: 'messages',
            populate: {
                path: 'writer'
            }
        })
        .then(messages => {
            messages.messages = messages.messages.reverse()
            res.json(messages)
        })
        .catch(err => next(err))
})

router.get('/getUserConversations/:product_id', isAuthenticated, (req, res, next) => {

    const { product_id } = req.params

    Conversation
        .findOne({ $and: [{ product: product_id }, { user: req.payload._id }] })
        .then(conversation => res.json(conversation))
        .catch(err => next(err))
})

router.get('/getOneConversation/:conversation_id', (req, res, next) => {
    const { conversation_id } = req.params
    Conversation
        .findOne({ _id: conversation_id })
        .then(conversation => {
            res.json(conversation)
        })
        .catch(err => next(err))
})

router.get('/getMyProductsConversations', isAuthenticated, (req, res, next) => {

    Conversation
        .find({ productOwner: req.payload._id })
        .populate('product')
        .populate('user')
        .then(conversations => res.json(conversations))
        .catch(err => next(err))
})




// router.delete("/deleteMessage/:message_id", (req, res, next) => {

//     const { message_id } = req.params

//     Conversation
//         .findByIdAndDelete({ message_id }, { new: true })
//         .then(response => res.json(response))
//         .catch(err => next(err))
// })


module.exports = router