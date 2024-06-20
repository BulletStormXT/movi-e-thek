const express = require("express");
// const cors = require("cors")
const User = require("../models/user");
const { deleteUser } = require("../controllers/user");

const userController = require("../controllers/user");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

// router.use(cors());

router.get("/user", authMiddleware.authenticateToken, userController.getUsers);
//   .patch(
//     "/user/:id",
//     authMiddleware.authenticateToken,
//     userController.updateUser
//   )
//   ;
router.patch(
  "/user/:id",
  authMiddleware.authenticateToken,
  userController.updateUser
);

// GET user by ID (protected route)
router.get("/user/:id", authMiddleware.authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Error fetching user");
  }
});
const deleteUserById = async (req, res) => {
  try {
    const userID = req.params.id;
    await User.findByIdAndDelete(userID);
    res.send(`Delete was successfully ${userID}`);
  } catch (error) {
    res.send(error);
  }
};

router.delete("/:id", deleteUserById);

module.exports = router;
