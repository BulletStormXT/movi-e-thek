const authService = require("../services/login");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { token, role, name, cart } = await authService.login(
      email,
      password
    );

    res.json({
      token,
      role,
      name,
      email,
      cart,
    });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: error.message });
  }
}

module.exports = {
  login,
};
