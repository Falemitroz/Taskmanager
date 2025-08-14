import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '../../components';
import styles from './Home.module.css';

const Home = () => {
    const navigate = useNavigate();

    return (
      <div className={styles.home}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h1>Benvenuto su TaskManager!</h1>
          <p>Organizza le tue attività quotidiane, aumenta la tua produttività e non dimenticare mai nulla.</p>
            <Button 
              onClick={() => navigate('/dashboard')}
              children={"Inizia ora"}
              width='max-content'
              margin='auto'
            />
        </div>
  
        {/* Feature Highlights */}
        <div className={styles.featureContainer}>
          <h1>Gestisci le tue attività in modo semplice</h1>
          <div className={styles.feature}>
            <h3>Crea liste di Tasks</h3>
            <p>Organizza e gestisci più attività correlate riunendole in un’unica lista.</p>
          </div>
          <div className={styles.feature}>
            <h3>Crea Task</h3>
            <p>Aggiungi attività facilmente e velocemente per non dimenticare mai nulla.</p>
          </div>
          <div className={styles.feature}>
            <h3>Modifica e Prioritizza</h3>
            <p>Organizza il tuo lavoro modificando i task in base alle tue necessità.</p>
          </div>
          <div className={styles.feature}>
            <h3>Elimina Task</h3>
            <p>Non hai più bisogno di un task? Eliminalo in un click per mantenere tutto in ordine.</p>
          </div>
        </div>
  
        {/* Footer */}
        <div className={styles.footer}>
          <p>© 2025 TaskManager | Tutti i diritti riservati</p>
        </div>
      </div>
    );
      
};

export default Home;
