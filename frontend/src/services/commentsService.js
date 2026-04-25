import api from "./api";

export async function getCommentsByPostId(postId) {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
}

export async function createComment(postId, data) {
  const response = await api.post(`/posts/${postId}/comments`, data);
  return response.data;
}