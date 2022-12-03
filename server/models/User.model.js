const { Schema, model } = require("mongoose")


const userSchema = new Schema(
  {
    userName: {
      type: String
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
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
