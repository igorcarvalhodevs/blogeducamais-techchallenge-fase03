const express = require("express");
const cors = require("cors");
const postRoutes = require("./modules/posts/post.routes");
const authRoutes = require("./modules/auth/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

module.exports = app;