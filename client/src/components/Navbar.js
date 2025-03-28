import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import '../styles/Navbar.css';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);


  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <a to="/" className="navbar-logo">
        <img src="/logo.png" alt="TaskManager Logo" />
      </a>
      
      <div className="navbar-menu">
        {user.id ? (
          <div className="user-menu">
            <button className="user-btn" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              Benvenuto, {user.username}!
            </button>
            {isUserMenuOpen && (
              <ul className="dropdown-menu">
                <li onClick={handleLogout}>Logout</li>
              </ul>
            )}
          </div>
        ) : (
          <a to="/authForm" className="btn btn-primary">Accedi</a>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
