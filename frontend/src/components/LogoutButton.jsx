import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function LogoutButton({ onLogout = () => {} }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("logout/"); // backend endpoint from evms/urls.py
    } catch (e) {
      console.error("Logout request failed:", e);
    }

    // clear local client state
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");

    // notify parent and redirect
    try { onLogout(); } catch (e) { /* ignore */ }
    navigate("/login");
  };

  return (
    <button type="button" className="dropdown-item" onClick={handleLogout}>
      Logout
    </button>
  );
}