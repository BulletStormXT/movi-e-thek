const User = require("../models/user");

async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const updates = req.body;

  // Check if the email is being updated
  if (updates.email) {
    try {
      const existingUser = await User.findOne({ email: updates.email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: "Email already exists" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = {
  getUsers,
  deleteUser,
  updateUser,
};
