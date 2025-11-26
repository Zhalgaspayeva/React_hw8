import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import "../styles/Profile.css";


export default function Profile() {
    const { user, loading, logout } = useAuth();

    if (loading) return <Spinner />;
  
    if (!user) return <Navigate to="/login" />;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">

        <h1 className="profile-title">Profile</h1>

        <div className="profile-info">
          <p><strong>Email:</strong> {user?.email}</p>
        </div>

        <button className="btn-logout" onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}