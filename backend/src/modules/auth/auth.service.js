const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("./users.mock");

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_blogeducamais";

async function login(username, password) {
  const user = users.find((u) => u.username === username);

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return null;
  }

  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: "8h" }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    },
  };
}

module.exports = { login };