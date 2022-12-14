const { Schema, model } = require("mongoose")

const conversationSchema = new Schema(
    {
        messages: [{
            message: {
                type: String
            },
            writer: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            date: {
                type: Date
            }
        }],
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        productOwner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const Conversation = model("Conversation", conversationSchema)

module.exports = Conversation