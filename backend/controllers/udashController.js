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

    // Check if the product is already in the user's udash
    if (!user.udash.includes(productId)) {
      user.udash.push(productId);
      await user.save();
    }

    res.status(201).send(user.udash);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateudashItem = async (req, res) => {
  const userId = req.params.userId;
  const { udashItemId } = req.params;
  const { newData } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const udashItem = user.udash.id(udashItemId);
    if (!udashItem) {
      return res.status(404).send("Dashboard item not found");
    }

    // Update the necessary fields
    Object.assign(udashItem, newData);
    await user.save();
    res.send(user.udash);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.removeudashItem = async (req, res) => {
  const userId = req.params.userId;
  const { udashItemId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Remove the udash item
    user.udash = user.udash.filter((item) => !item.equals(udashItemId));
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
    const user = await User.findById(userId).populate("udash");
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user.udash);
  } catch (error) {
    res.status(400).send(error);
  }
};
