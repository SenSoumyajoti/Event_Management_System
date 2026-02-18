import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../api";

const Header = ({ isLoggedIn = false, onLogout = () => {}, userName = "Guest", minimal = false }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const toggle = () => setOpen(v => !v);
  const close = () => setOpen(false);

  // close when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("logout/"); // adjust if your api baseURL requires a prefix
    } catch (err) {
      console.error("Logout request failed:", err);
    }
    // clear client-side auth
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");

    try { onLogout(); } catch (e) { /* ignore */ }
    close();
    navigate("/login");
  };

  if (minimal) {
    return (
      <header className="py-3 bg-light">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="navbar-brand">EventSphere</Link>
          {!isLoggedIn ? <Link to="/login" className="btn btn-outline-primary">Login</Link> : null}
        </div>
      </header>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">EventSphere</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto align-items-center">
            {!isLoggedIn ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            ) : (
              <li className="nav-item" ref={menuRef} style={{ position: "relative" }}>
                <button
                  className="btn btn-outline-secondary"
                  onClick={toggle}
                  aria-expanded={open}
                  aria-haspopup="true"
                >
                  {userName || "Profile"}
                </button>

                {open && (
                  <div
                    className="card shadow-sm"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 8px)",
                      minWidth: 160,
                      zIndex: 2000
                    }}
                  >
                    <ul className="list-unstyled mb-0">
                      <li>
                        <Link className="dropdown-item px-3 py-2 d-block" to="/profile" onClick={close}>
                          View Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item px-3 py-2 d-block" to="/createevent" onClick={close}>
                          Register Event
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider my-1" /></li>
                      <li>
                        <button className="dropdown-item px-3 py-2 w-100 text-start" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;