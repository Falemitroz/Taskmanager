import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Funzione per ottenere il token dal localStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `${token}`} : {};
};

export const createTask = async (title, description, userId) => {
    try {
        const response = await axios.post(
            `${baseURL}/task`,
            { title, description, userId },
            { headers: getAuthHeader() } // 🔹 Aggiunto token nell'header
        );
        return response.data; 
    } catch (error) {
        console.error('❌ Errore nella creazione del task:', error);
        throw error;
    }
};

export const getTasks = async (userId) => {
    try {
        const response = await axios.get(`${baseURL}/task`, { 
            params: { userId },
            headers: getAuthHeader() // 🔹 Aggiunto token nell'header
        });

        console.log("✅ Risposta ricevuta:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Errore nella richiesta getTasks:", error);
        throw error;
    }
};

export const getTaskByTitle = async (title) => {
    try {
        const response = await axios.get(`${baseURL}/task/${title}`, {
            headers: getAuthHeader() // 🔹 Aggiunto token nell'header
        });

        console.log("✅ Risposta ricevuta:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Errore nella richiesta getTaskByTitle:", error);
        throw error;
    }
};

export const updateTask = async (taskId, updatedData) => {
    console.log("Dati da inviare alla API:", { updatedData });
    try {
        const response = await axios.patch(`${baseURL}/task/${taskId}`, updatedData, {
            headers: getAuthHeader() // 🔹 Aggiunto token nell'header
        });
        console.log("✅ Response della API:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Errore nella richiesta updateTask:", error);
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${baseURL}/task/${taskId}`, {
            headers: getAuthHeader() // 🔹 Aggiunto token nell'header
        });
        console.log("✅ Task eliminata:", response.data);
    } catch (error) {
        console.error("❌ Errore nell'eliminazione della task:", error);
        throw error;
    }
};