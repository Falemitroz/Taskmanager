import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";
// import "../styles/AuthForm.css";

function AuthForm({ title, btnTitle, onClose, onSubmit, switchText, switchAction, error }) {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit( username, password ); // Passiamo i dati al componente genitore
};
  
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <RiCloseLargeLine className="modal-close" onClick={onClose} />
        <h2>{title}</h2>
        {error && <p className="error">{error}</p>}
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-box">
            <input type="text" 
                   placeholder="Username" 
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" 
                   placeholder="Password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required />
            <FaLock className="icon" />
          </div>
          <button type="submit">{btnTitle}</button>
        </form>
        <p className="register-link" onClick={switchAction}>
          {switchText}
        </p>
      </div>
    </div>
  );
}

export default AuthForm;