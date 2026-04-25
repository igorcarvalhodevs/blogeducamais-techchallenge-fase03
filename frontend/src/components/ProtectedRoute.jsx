import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children, teacherOnly }) {
  const { isAuthenticated, isTeacher } = useAuth();

  // não logado → login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // logado mas não é professor → bloqueia
  if (teacherOnly && !isTeacher) {
    return <Navigate to="/posts" />;
  }

  return children;
}

export default ProtectedRoute;