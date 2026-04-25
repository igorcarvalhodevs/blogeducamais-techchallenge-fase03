import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts, deletePost } from "../services/postsService";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const { isTeacher } = useAuth();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
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
      setError("Erro ao carregar posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Deseja excluir este post?")) return;

    try {
      await deletePost(id);
      alert("Post excluído com sucesso");
      loadPosts();
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir post");
    }
  }

  function getExcerpt(content) {
    if (!content) return "";
    return content.length > 120 ? `${content.slice(0, 120)}...` : content;
  }

  const filteredPosts = posts.filter((post) => {
    const term = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term)
    );
  });

  if (loading) return <p>Carregando posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="title">Blog Educa Mais</h1>

        <div className="dashboard-actions">
          <input
            className="input dashboard-search"
            type="text"
            placeholder="Buscar por título ou conteúdo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="empty-state">Nenhum post encontrado.</div>
      ) : (
        <div className="table-container">
          <table className="posts-table">
            <thead>
              <tr>
                <th>Professor</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>Data</th>
                {isTeacher && <th>Ações</th>}
              </tr>
            </thead>

            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td className="author-cell" data-label="Professor">
                    {post.author}
                  </td>

                  <td className="title-cell" data-label="Título">
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </td>

                  <td className="excerpt-cell" data-label="Descrição">
                    {getExcerpt(post.content)}
                  </td>

                  <td className="date-cell" data-label="Data">
                    {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                  </td>

                  {isTeacher && (
                    <td className="actions-cell" data-label="Ações">
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
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Home;