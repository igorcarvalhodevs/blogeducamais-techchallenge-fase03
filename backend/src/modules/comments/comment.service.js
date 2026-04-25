const prisma = require("../../config/prisma");

async function listByPostId(postId) {
  console.log("DEBUG prisma.comment:", prisma.comment);
  console.log("DEBUG postId:", postId);

  return prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "desc" },
  });
}

async function create(postId, data) {
  console.log("DEBUG prisma.comment:", prisma.comment);
  console.log("DEBUG create data:", { postId, ...data });

  return prisma.comment.create({
    data: {
      postId,
      content: data.content,
      author: data.author,
      userRole: data.userRole,
    },
  });
}

module.exports = {
  listByPostId,
  create,
};