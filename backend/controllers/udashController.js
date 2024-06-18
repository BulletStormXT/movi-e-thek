const User = require("../models/user");
const Product = require("../models/productModel");

exports.addToudash = async (req, res) => {
  const userId = req.params.userId;
  const { productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }


    // ? Check if the product is already in the user's udash
    // const udashItem = user.udash.find((item) => item.product.equals(productId));
    // if (udashItem) {
    //   udashItem.quantity += quantity;
    // } else {
    //   user.udash.push({ product: productId, quantity });
    // }

    await user.save();
    res.status(201).send(user.udash);
  } catch (error) {
    res.status(400).send(error);
  }
};

//? Update the quantity of a udash item
// exports.updateCartItem = async (req, res) => {
//   const userId = req.params.userId;
//   const { cartItemId, quantity } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     const cartItem = user.cart.id(cartItemId);
//     if (!cartItem) {
//       return res.status(404).send("Cart item not found");
//     }

//     cartItem.quantity = quantity;
//     await user.save();
//     res.send(user.cart);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

exports.removeudashItem = async (req, res) => {
  const userId = req.params.userId;
  const { udashItemId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Find the index of the udash item in the user's udash array
    const index = user.udash.findIndex((item) => item._id.equals(udashItemId));
    if (index === -1) {
      return res.status(404).send("Dashboard item not found");
    }

    // Remove the udash item at the found index
    user.udash.splice(index, 1);
    await user.save();

    res.send(user.udash); // Send updated udash after deletion
  } catch (error) {
    console.error("Error deleting udash item:", error);
    res.status(500).send("Error deleting udash item");
  }
};

exports.getudashItems = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).populate("udash.product");
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user.udash);
  } catch (error) {
    res.status(400).send(error);
  }
};
