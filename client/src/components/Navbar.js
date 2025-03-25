import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import Login from "./Login";
import Register from "./Register";
// import '../styles/Navbar.css'

const NavBar = () => {
  const { user, login, register, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigate = useNavigate();

  const loginModal = (e) => {
    if(e) e.preventDefault();
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (!user.id) {
        setIsModalOpen(false);
    } else {
        setIsUserMenuOpen(false);
    }
  }, [user.id]);

  const handleLogout = () => {
    logout(); // Esegui il logout
    navigate('/'); // Redirigi alla home
  };

  return (
    <nav className="navbar-container">
      <a href="/" className="logo">
        <img src="/logo.png"/>
      </a>

      {user.id && <a href="/dashboard">Dashboard</a>}
      {!user.id ? (
        <a href="/" onClick={(e) => loginModal(e)}>Accedi</a>
      ) : (
        <div className="dropdown">
          <button className="dropdown-btn" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              Benvenuto {user.username}!
          </button>

          {isUserMenuOpen && (
            <ul className="dropdown-menu">
              <li onClick={handleLogout}>Logout</li>
            </ul>
          )}
        </div>
      )}

      {isModalOpen && (
          isRegister ?(
            <Register 
              onClose={loginModal} 
              toggleRegister={() => setIsRegister(false)} 
              registerFn={register}
            />
          ) : (
            <Login 
              onClose={loginModal} 
              toggleRegister={() => setIsRegister(true)}
              loginFn={login} 
           />
          ))}
    </nav>
  );
};

export default NavBar;