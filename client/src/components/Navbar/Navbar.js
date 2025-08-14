import React from "react";
import styles from './Navbar.module.css';
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <img 
        src="/logo.png" 
        alt="TaskManager Logo" 
        className={styles.logo}
        onClick={() => navigate('/')}
      />
    </nav>
  );
}