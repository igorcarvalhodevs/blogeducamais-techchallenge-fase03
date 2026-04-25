const express = require("express");
const controller = require("./post.controller");
const requireAuth = require("../../middlewares/requireAuth");
const requireRole = require("../../middlewares/requireRole");
const { createPostSchema, updatePostSchema } = require("./post.validators");
const commentRoutes = require("../comments/comment.routes");

const router = express.Router();

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

/* rotas específicas primeiro */
router.get("/", controller.list);
router.get("/search", controller.search);

/* MUITO IMPORTANTE: comentários antes de /:id */
router.use("/:postId/comments", commentRoutes);

/* depois rota dinâmica do post */
router.get("/:id", controller.getById);

router.post(
  "/",
  requireAuth,
  requireRole("teacher"),
  validateBody(createPostSchema),
  controller.create
);

router.put(
  "/:id",
  requireAuth,
  requireRole("teacher"),
  validateBody(updatePostSchema),
  controller.update
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("teacher"),
  controller.remove
);

module.exports = router;