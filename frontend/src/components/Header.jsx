import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

function Header() {
  const { user, logout, isAuthenticated, isTeacher } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  function handleLogout() {
    logout();
    navigate("/posts");
  }

  function toggleDarkMode() {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);

    if (nextIsDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  function getDisplayName() {
    if (!user?.name) return "";

    if (user.role === "teacher") {
      return user.name.startsWith("Prof.") ? user.name : `Prof. ${user.name}`;
    }

    if (user.role === "student") {
      return user.name.startsWith("Aluno") ? user.name : `Aluno ${user.name}`;
    }

    return user.name;
  }

  return (
    <header className="header">
      <nav className="nav-links">
        <Link className="nav-button" to="/posts">
          Posts
        </Link>

        {isTeacher && (
          <Link className="nav-button" to="/admin">
            Admin
          </Link>
        )}

        {isTeacher && (
          <Link className="nav-button" to="/create">
            Novo Post
          </Link>
        )}
      </nav>

      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <span>{getDisplayName()}</span>

            <button className="button" onClick={toggleDarkMode}>
              {isDark ? "☀️" : "🌙"}
            </button>

            <button className="button" onClick={handleLogout}>
              Sair
            </button>
          </>
        ) : (
          <>
            <button className="button" onClick={toggleDarkMode}>
              {isDark ? "☀️" : "🌙"}
            </button>

            <Link className="nav-button" to="/login">
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;