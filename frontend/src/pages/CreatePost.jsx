import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postsService";
import { useAuth } from "../contexts/AuthContext";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await createPost({
        title,
        content,
        author: user?.name || "Professor",
      });

      alert("Post criado com sucesso");
      navigate("/posts");
    } catch {
      alert("Erro ao criar post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <h1 className="title">Novo Post</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="textarea"
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="button" disabled={loading}>
          {loading ? "Criando..." : "Criar"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;