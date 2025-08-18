// src/Header.jsx
import { useAuth } from "../../context/AuthContext.jsx";
import "./header.css";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>3D Configurator</h1>
        <nav className="auth-nav">
          {isAuthenticated() ? (
            <div className="user-info">
              <span className="username">Welcome, {user?.username}</span>
              {user?.role === 'admin' && (
                <a href="/admin" className="admin-link">Admin Panel</a>
              )}
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="auth-links">
              <a href="/login" className="auth-link">Login</a>
              <a href="/register" className="auth-link">Register</a>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
