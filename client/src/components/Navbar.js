import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";

import AuthForm from "./AuthForm";
// import Login from "./Login";
// import Register from "./Register";
// import '../styles/Navbar.css'

const NavBar = () => {
  const { user, login, register, logout } = useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = useState(false);
  // const [isRegister, setIsRegister] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleAuthModal = (e) => {
    if(e) e.preventDefault();
    setShowAuthModal(!showAuthModal);
  };

  useEffect(() => {
    if (!user.id) {
        setShowAuthModal(false);
    } else {
        setIsUserMenuOpen(false);
    }
  }, [user.id]);

  const handleLogout = () => {
    logout(); // Esegui il logout
    navigate('/'); // Redirigi alla home
  };

  return (
    <nav>
      <a href="/">
        <img src="/logo.png"/>
      </a>

      {user.id && <a href="/dashboard">Dashboard</a>}
      {!user.id ? (
        <a href="/" onClick={(e) => toggleAuthModal(e)}>Accedi</a>
      ) : (
        <div>
          <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              Benvenuto {user.username}!
          </button>

          {isUserMenuOpen && (
            <ul>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          )}
        </div>
      )}

      {showAuthModal && (
        <AuthForm 
          onClose={toggleAuthModal}
          login={login}
          register={register}
        />
      )}
    </nav>
  );
};

export default NavBar;