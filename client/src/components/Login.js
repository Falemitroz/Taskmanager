import { useState } from "react";
import AuthForm from "./AuthForm";

const Login = ({onClose, toggleRegister, loginFn}) => {

    const [error, setError] = useState("");

    const handleSubmit = async ( username, password) => {
        try {
            await loginFn(username, password);
            onClose();
        } catch (err) {
            setError(err.response?.data?.error || "Username o password errati.");
        }

    };
    
    return (
        <AuthForm 
            title="Login"
            btnTitle="Accedi"
            onClose={onClose}
            onSubmit={handleSubmit}
            switchText="Non hai un account? Registrati"
            switchAction={toggleRegister}
            error={error}
        />
    );
};

export default Login;