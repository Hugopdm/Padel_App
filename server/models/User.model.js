const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    userName: {
      type: String
    },
    email: {
      type: String,
      required: [true, 'Email es necesario.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Contraseña es necesaria.']
    },
    imageUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User
