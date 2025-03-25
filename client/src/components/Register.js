import { useState } from "react";
import AuthForm from "./AuthForm";

const Register = ({onClose, toggleRegister, registerFn}) => {

    const [error, setError] = useState("");

    const handleSubmit = async (username, password) => {
        try {
            await registerFn(username, password);
            onClose();
        } catch (err) {
            setError(err.response?.data?.error || "Errore durante la registrazione");
        }
    };
    
    return (
        <AuthForm 
            title="Registrazione"
            btnTitle="Registrati"
            onClose={onClose}
            onSubmit={handleSubmit}
            switchText="Hai già un account? Accedi"
            switchAction={toggleRegister}
            error={error}
        />
    );
};

export default Register;