const bycript = require("bcrypt");
const User = require("../models/user");
const generateToken = require("../utils/jwtUtils").generateToken;

async function login(email, password) {
  try {
    const existingUser = await User.findOne({ email }); // return "User" if it exist
    if (!existingUser) {
      throw new Error("User not found!");
    }
    const isPasswordValid = await bycript.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = generateToken(existingUser);

    //return token, name, role and cart of the user
    return {
      token,
      name: existingUser.name,
      role: existingUser.role,
      email: existingUser.email,
      cart: existingUser.cart,
    };
  } catch (error) {
    console.log(error.message);
    throw new Error("Invalid credentials");
  }
}
module.exports = { login };
