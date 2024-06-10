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
  email: String,
  password: String,
  cart: [cartItemSchema],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
