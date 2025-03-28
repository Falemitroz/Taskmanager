import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { FaUser, FaLock } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css"; // Assicurati di importare il CSS

const AuthForm = () => {
  const { login, register } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(username, password);
        navigate("/dashboard");
      } else {
        await register(username, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-form-container">
        <IoMdCloseCircleOutline onClick={() => navigate("/")} className="close-btn"/>
        <h2>{isLogin ? 'Login' : 'Registrazione'}</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <FaUser className="icon"/>
          </div>
          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <FaLock className="icon"/>
          </div>
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
