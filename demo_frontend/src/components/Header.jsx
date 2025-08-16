import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../api";
import LogoutButton from "./LogoutButton";

const Header = ({ isLoggedIn = false, onLogout = () => {}, userName = "Guest", minimal = false }) => {
  const navigate = useNavigate();
  const categories = ["Music", "Sports", "Tech", "Art", "Food", "Travel"];


  const handleLogout = async () => {
    try {
      // call backend logout (csrf_exempt)
      await api.post("logout/"); 
    } catch (e) {
      // ignore network errors, still clear client state
      console.error(e);
    }
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    onLogout();
    navigate("/login");
  };

  if (minimal) {
    return (
      <header className="py-3 bg-light">
        <div className="container d-flex justify-content-between">
          <Link to="/">EventSphere</Link>
          {!isLoggedIn ? <Link to="/login">Login</Link> : null}
        </div>
      </header>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">EventSphere</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  {userName || "Profile"}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                  <li><Link className="dropdown-item" to="/profile">View Profile</Link></li>
                  <li><Link className="dropdown-item" to="/register">Register</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><LogoutButton onLogout={onLogout} /></li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;