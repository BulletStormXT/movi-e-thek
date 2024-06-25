const { Schema } = require("mongoose");
const mongoose = require("../configuration/dbConfig");
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
});

const userSchema = new mongoose.Schema({
  name: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  birthDate: Date,
  profilePicture: String,
  password: String,
  cart: [cartItemSchema],
  udash: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
