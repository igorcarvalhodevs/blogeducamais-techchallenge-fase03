const { z } = require("zod");

const createCommentSchema = z.object({
  content: z.string().min(1, "content is required"),
});

module.exports = { createCommentSchema };