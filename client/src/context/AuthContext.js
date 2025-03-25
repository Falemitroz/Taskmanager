import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

import { createTask, getTasks, getTaskByTitle, updateTask, deleteTask } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({id: null, username: null});
    const [token, setToken] = useState(localStorage.getItem("token"));

    const baseURL = "http://localhost:5001/auth";


    useEffect(() => {
        if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Tempo attuale in secondi

            if (decodedToken.exp > currentTime) {
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            }
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const res = await axios.post(`${baseURL}/login`, { username, password });
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify({ id: res.data.id, username: res.data.username }));
                setToken(res.data.token);
                setUser({id: res.data.id, username: res.data.username});
            } else {
                console.error("❌ Nessun token ricevuto dal server");
            }
        } catch (error) {
            throw error;
        }
    };

    const register = async (username, password) => {
        try {
            const res = await axios.post(`${baseURL}/register`, { username, password });
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                setUser({id: res.data.id, username: res.data.username});
            } else {
                console.error("❌ Nessun token ricevuto dal server");
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser({id: null, username: null});
    };

    const create_Task = async (title, description) => {
        await createTask(title, description, user.id);
    }
    
    const get_Tasks = async () => {
        if (!user || !user.id) {
            console.warn("⏳ Aspetto che userId sia disponibile...");
            return;
        }

        return await getTasks(user.id);
    };

    const get_TaskByTitle = async (title) => {
        return await getTaskByTitle(title);
    }

    const update_Task = async (taskId, title, description, completed) => {
        const updatedTask = {};
        if (title !== undefined) updatedTask.title = title;
        if (description !== undefined) updatedTask.description = description;
        if (completed !== undefined) updatedTask.completed = completed;

        return await updateTask(taskId, updatedTask);
    };

    const delete_Task = async (taskId) => {
        return await deleteTask(taskId);
    }

    const values = { user, login, register, logout, 
                     create_Task, get_Tasks, get_TaskByTitle,
                     update_Task, delete_Task 
                    };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};


export default AuthContext;
