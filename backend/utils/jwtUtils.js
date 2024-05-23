const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "3h" });
}
module.exports = { generateToken };
