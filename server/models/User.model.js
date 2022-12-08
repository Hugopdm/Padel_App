const { Schema, model } = require("mongoose")
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, 'Nombre de usuario necesario']
    },
    email: {
      type: String,
      required: [true, 'Email necesario.'],
      minlength: [4, 'La contraseña debe tener mínimo 4 caracteres'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Contraseña necesaria.']
    },
    imageUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword
  next()
})

const User = model("User", userSchema)

module.exports = User
