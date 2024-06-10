const User = require("../models/user");
const Product = require("../models/productModel");

exports.addToCart = async (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    const cartItem = user.cart.find((item) => item.product.equals(productId));
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.status(201).send(user.cart);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateCartItem = async (req, res) => {
  const userId = req.params.userId;
  const { cartItemId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const cartItem = user.cart.id(cartItemId);
    if (!cartItem) {
      return res.status(404).send("Cart item not found");
    }

    cartItem.quantity = quantity;
    await user.save();
    res.send(user.cart);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.removeCartItem = async (req, res) => {
  const userId = req.params.userId;
  const { cartItemId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const cartItem = user.cart.id(cartItemId);
    if (!cartItem) {
      return res.status(404).send("Cart item not found");
    }

    cartItem.remove();
    await user.save();
    res.send(user.cart);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getCartItems = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).populate("cart.product");
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user.cart);
  } catch (error) {
    res.status(400).send(error);
  }
};
