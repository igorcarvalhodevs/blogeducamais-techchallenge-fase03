import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../services/postsService";
import {
  getCommentsByPostId,
  createComment,
} from "../services/commentsService";
import { useAuth } from "../contexts/AuthContext";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  const isStudent = isAuthenticated && user?.role === "student";

  async function loadComments() {
    try {
      const data = await getCommentsByPostId(id);
      setComments(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function loadPost() {
      try {
        const data = await getPostById(id);
        setPost(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar post");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
    loadComments();
  }, [id]);

  async function handleSubmitComment(e) {
    e.preventDefault();

    try {
      setCommentLoading(true);
      await createComment(id, { content: commentContent });
      setCommentContent("");
      await loadComments();
      alert("Comentário enviado com sucesso");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar comentário");
    } finally {
      setCommentLoading(false);
    }
  }

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post não encontrado.</p>;

  return (
    <div className="post-detail-page">
      <div className="detail-card">
        <div className="detail-section">
          <span className="detail-label">Professor</span>
          <p className="detail-value">{post.author}</p>
        </div>

        <div className="detail-section">
          <span className="detail-label">Título</span>
          <p className="detail-value">{post.title}</p>
        </div>

        <div className="detail-section">
          <span className="detail-label">Conteúdo</span>
          <p className="detail-content">{post.content}</p>
        </div>

        <div className="detail-section">
          <span className="detail-label">Data</span>
          <p className="detail-value">
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("pt-BR")
              : "Sem data"}
          </p>
        </div>
      </div>

      <div className="detail-back">
        <button className="button" onClick={() => navigate("/posts")}>
          Voltar
        </button>
      </div>

      <div className="detail-card">
        <h2 className="title detail-comments-title">Comentários</h2>

        {isStudent ? (
          <form onSubmit={handleSubmitComment} className="comment-form">
            <textarea
              className="textarea"
              placeholder="Escreva seu comentário..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />

            <button className="button" disabled={commentLoading}>
              {commentLoading ? "Enviando..." : "Comentar"}
            </button>
          </form>
        ) : (
          <p className="text-muted detail-comment-note">
            Apenas alunos logados podem comentar.
          </p>
        )}

        {comments.length === 0 ? (
          <p className="text-muted">Nenhum comentário ainda.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <strong>{comment.author}</strong>
              <p>{comment.content}</p>
              <small className="text-muted">
                {new Date(comment.createdAt).toLocaleString("pt-BR")}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PostDetail;