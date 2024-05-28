const userService = require("../services/user");
const User = require("../models/user");


async function getUsers(req, res) {
    try {
        const users  = await userService.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error})
    }
}

exports.deleteUser = async (req, res) => {
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
  };

module.exports = {
    getUsers
};
