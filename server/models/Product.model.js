const { Schema, model } = require("mongoose")


const productSchema = new Schema(
    {
        productName: {
            type: String
        },
        category: {
            type: String,
            enum: ['palas', 'calzado', 'ropa', 'accesorios']
        },
        description: {
            type: String
        },
        price: {
            type: Number
        },
        imageUrl: {
            type: String,
            required: [true, 'La imagen es obligatoria']
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }

    },
    {
        timestamps: true
    }
)

const Product = model("Product", productSchema)

module.exports = Product