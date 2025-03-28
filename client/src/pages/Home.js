import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import '../styles/Home.css';

const Home = () => {

    const { user } = useContext(AuthContext);

    return (
      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Benvenuto su TaskManager!</h1>
            <p>Organizza le tue attività quotidiane, aumenta la tua produttività e non dimenticare mai nulla.</p>
            <Link 
                to={user.id? "/dashboard" : "/authForm"} 
                className="btn btn-primary"
            >
                {!user.id? "Inizia ora" : "Vai alla dashboard" }
            </Link>
          </div>
        </section>
  
        {/* Feature Highlights */}
        <section className="feature-highlights">
          <h2>Gestisci le tue attività in modo semplice</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <h3>Crea Task</h3>
              <p>Aggiungi attività facilmente e velocemente per non dimenticare mai nulla.</p>
            </div>
            <div className="feature-card">
              <h3>Modifica e Prioritizza</h3>
              <p>Organizza il tuo lavoro modificando i task in base alle tue necessità.</p>
            </div>
            <div className="feature-card">
              <h3>Elimina Task</h3>
              <p>Non hai più bisogno di un task? Eliminalo in un clic per mantenere tutto in ordine.</p>
            </div>
          </div>
        </section>
  
        {/* Stats Section */}
        <section className="stats">
          <h2>I numeri che fanno la differenza</h2>
          <div className="stats-container">
            <div className="stat">
              <h3>1,500+</h3>
              <p>Task completati</p>
            </div>
            <div className="stat">
              <h3>500+</h3>
              <p>Utenti registrati</p>
            </div>
            <div className="stat">
              <h3>100%</h3>
              <p>Sicurezza dei dati</p>
            </div>
          </div>
        </section>
  
        {/* Testimonials */}
        <section className="testimonials">
          <h2>Cosa dicono i nostri utenti</h2>
          <div className="testimonial">
            <p>"TaskManager mi ha cambiato la vita! Ora non dimentico mai più i miei impegni." - Laura, Freelance</p>
          </div>
          <div className="testimonial">
            <p>"Ottima app per organizzare la mia giornata. Funziona alla perfezione!" - Marco, Developer</p>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="footer">
          <p>© 2025 TaskManager | Tutti i diritti riservati</p>
        </footer>
      </div>
    );
      
};

export default Home;
