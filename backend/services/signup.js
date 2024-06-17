const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function createUser(userDate) {
  const { name, email, password } = userDate;
  const hashedPassword = await bcrypt.hash(password, 10);

  // check for existing mail from user
  const existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    const createdUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });
    const savedUser = await createdUser.save();
    return savedUser;
  } else {
    console.log("User already exists");
  }
}

module.exports = { createUser };
