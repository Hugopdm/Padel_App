const { Schema, model } = require("mongoose")


const productSchema = new Schema(
    {
        productName: {
            type: String,
            require: [true, 'El nombre del producto es obligatorio.']
        },
        category: {
            type: String,
            enum: ['palas', 'calzado', 'ropa', 'accesorios'],
            require: [true, 'Seleccione categoria.']
        },
        description: {
            type: String,
            minlength: [10, 'La descripción debe tener como mínimo 10 caracteres.']
        },
        price: {
            type: Number,
            require: [true, 'El precio es obligatorio']
        },
        imageUrl: {
            type: String,
            required: [true, 'La imagen es obligatoria.']
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