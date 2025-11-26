import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/NavBar.css';
import { useAuth } from '../context/AuthProvider'

export default function NavBar() {
  
const { user, loading, logout } = useAuth();

  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/items">Characters</NavLink>
      {loading ? (
                    <span className="loading-mini">...</span> 
                ) : user ? (
                    <>
                        <NavLink to="/profile">Profile</NavLink>
                        <button onClick={logout} className="logout-btn">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="login-btn">Login</NavLink>
                        <NavLink to="/signup" className="signup-btn">Signup</NavLink>
                    </>
                )}
    </nav>
  );
}