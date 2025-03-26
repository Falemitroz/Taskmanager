import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";
// import "../styles/AuthForm.css";

const AuthForm = ({ onClose, login, register }) => {
  // Stato per la gestione della modalità (login/registrazione)
  const [isLogin, setIsLogin] = useState(true);  // true -> login, false -> register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Funzione di submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Logica per il login
        await login(username, password);
        onClose();
      } else {
        // Logica per la registrazione
        await register(username, password);
        onClose();
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <div>
        <RiCloseLargeLine onClick={onClose} />
        <h2>{isLogin ? 'Login' : 'Registrazione'}</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <FaUser />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <FaLock />
          <button type="submit">{isLogin ? 'Accedi' : 'Registrati'}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Non hai un account? Registrati" : "Hai già un account? Accedi"}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
