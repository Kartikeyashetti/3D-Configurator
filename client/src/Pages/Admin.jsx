import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import "./Login.css";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { logout, token } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/users", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        setMessage("Failed to fetch users");
      }
    } catch (error) {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/auth/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        setMessage("User deleted successfully");
        fetchUsers(); // Refresh the list
      } else {
        setMessage("Failed to delete user");
      }
    } catch (error) {
      setMessage("Network error");
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="auth-page">
      <div className="auth-container admin-container">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        
        {message && (
          <div className={`message ${message.includes("successfully") ? "success" : "error"}`}>
            {message}
          </div>
        )}
        
        <div className="users-section">
          <h3>User Management</h3>
          <div className="users-list">
            {users.map(user => (
              <div key={user._id} className="user-item">
                <div className="user-info">
                  <span className="username">{user.username}</span>
                  <span className="email">{user.email}</span>
                  <span className={`role ${user.role}`}>{user.role}</span>
                </div>
                <div className="user-actions">
                  <button 
                    onClick={() => handleDeleteUser(user._id)}
                    className="delete-btn"
                    disabled={user.role === 'admin'}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
