const authService = require("./auth.service");

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "username and password are required",
    });
  }

  const result = await authService.login(username, password);

  if (!result) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  return res.status(200).json(result);
}

module.exports = { login };