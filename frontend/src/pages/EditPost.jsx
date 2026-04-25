import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../services/postsService";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadPost() {
      try {
        const data = await getPostById(id);
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
      } catch {
        alert("Erro ao carregar post");
      } finally {
        setLoadingPage(false);
      }
    }

    loadPost();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);

      await updatePost(id, { title, content, author });

      alert("Post atualizado com sucesso");
      navigate("/posts");
    } catch {
      alert("Erro ao atualizar post");
    } finally {
      setSaving(false);
    }
  }

  if (loadingPage) return <p>Carregando...</p>;

  return (
    <div className="form-container">
      <h1 className="title">Editar Post</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="button" disabled={saving}>
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}

export default EditPost;