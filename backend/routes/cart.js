const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/users/:userId/cart", cartController.addToCart);
router.patch("/users/:userId/cart/:cartItemId", cartController.updateCartItem);
router.delete("/users/:userId/cart/:cartItemId", cartController.removeCartItem);
router.get("/users/:userId/cart", cartController.getCartItems);

module.exports = router;
