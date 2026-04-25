import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts, deletePost } from "../services/postsService";

function Admin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPosts() {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar postagens");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Deseja excluir esta postagem?")) return;

    try {
      await deletePost(id);
      alert("Postagem excluída com sucesso");
      loadPosts();
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir postagem");
    }
  }

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="title">Página Administrativa</h1>

      {posts.length === 0 ? (
        <div className="empty-state">Nenhuma postagem cadastrada.</div>
      ) : (
        <div className="table-container">
          <table className="posts-table">
            <thead>
              <tr>
                <th>Professor</th>
                <th>Título</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="author-cell">{post.author}</td>
                  <td className="title-cell">{post.title}</td>
                  <td className="date-cell">
                    {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="actions-cell">
                    <div className="table-actions">
                      <Link className="button small" to={`/edit/${post.id}`}>
                        Editar
                      </Link>
                      <button
                        className="button danger small"
                        onClick={() => handleDelete(post.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;