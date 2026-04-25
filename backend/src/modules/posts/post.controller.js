const postService = require("./post.service");

async function list(req, res) {
  const posts = await postService.getAllPosts();
  res.json(posts);
}

async function getById(req, res) {
  const post = await postService.getPostById(req.params.id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
}

async function create(req, res) {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function remove(req, res) {
  try {
    await postService.deletePost(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function search(req, res) {
  const term = req.query.term;

  if (!term) {
    return res.status(400).json({
      message: "Missing query param: term",
    });
  }

  const posts = await postService.searchPosts(term);
  res.json(posts);
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  search,
};