const express = require("express")
// const cors = require("cors")

const userController = require("../controllers/user")
const authMiddleware = require("../utils/authMiddleware")

const router = express.Router();

// router.use(cors());

router.get("/user", authMiddleware.authenticateToken, userController.getUsers)

module.exports = router;