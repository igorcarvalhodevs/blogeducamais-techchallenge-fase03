const express = require("express");
const controller = require("./comment.controller");
const requireAuth = require("../../middlewares/requireAuth");
const requireRole = require("../../middlewares/requireRole");
const { createCommentSchema } = require("./comment.validators");

const router = express.Router({ mergeParams: true });

function validateBody(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation error",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    req.body = parsed.data;
    next();
  };
}

router.get("/", controller.listByPost);

router.post(
  "/",
  requireAuth,
  requireRole("student"),
  validateBody(createCommentSchema),
  controller.create
);

module.exports = router;