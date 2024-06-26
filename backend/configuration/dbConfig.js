const dotenv = require("dotenv");

const mongoose = require("mongoose");

dotenv.config();

const MONGODB_PASS = process.env.MONGODB_PASS;
const USER_NAME = process.env.USER_NAME;

const url = process.env.MONGODB_URI;
const PORT = process.env.PORT;

mongoose
  .connect(url)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose;
