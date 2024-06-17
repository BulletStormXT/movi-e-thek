const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function createAdminAccount() {
  try {
    // admin account test
    // const existAdmin = await User.findOne({ role: "admin" }); // nach admin-rolle suchen
    const existingAdmin = await User.findOne({ email: "thomas@gmail.com" });
    if (existingAdmin) {
      console.log("Admin account already exists");
      return;
    } else {
      console.log("Admin account does not exist");

      // admin account erstellen
      const newAdmin = new User({
        name: "Thomas",
        email: "thomas@gmail.com",
        password: await bcrypt.hash("admin", 10),
        role: "admin",
      });
      await newAdmin.save();
      console.log("Admin account created successfully");
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = createAdminAccount;
