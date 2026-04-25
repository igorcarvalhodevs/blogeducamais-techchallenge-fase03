const service = require("./comment.service");

async function listByPost(req, res) {
  try {
    const { postId } = req.params;
    const comments = await service.listByPostId(postId);
    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error listing comments" });
  }
}

async function create(req, res) {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const comment = await service.create(postId, {
      content,
      author: req.user.name,
      userRole: req.user.role,
    });

    return res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating comment" });
  }
}

module.exports = {
  listByPost,
  create,
};