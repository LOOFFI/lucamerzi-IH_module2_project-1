const mongoose = require("mongoose")
const Schema = mongoose.Schema

// CREATE SCHEMA
const UserSchema = new Schema({
  googleID: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  image: { type: String },
  isAdmin: { type: Boolean, default: false }
}, {
  timestamps: true
})

const User = mongoose.model("users", UserSchema)
module.exports = User