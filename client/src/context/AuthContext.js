import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { createTask, getTasks, getTaskByTitle, updateTask, deleteTask } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { id: null, username: null };
  });

  const [token, setToken] = useState(localStorage.getItem("token"));
  const baseURL = "http://localhost:5001/auth";

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp > Date.now() / 1000) {
          setUser(JSON.parse(localStorage.getItem("user")) || { id: null, username: null });
        } else {
          logout();
        }
      } catch (error) {
        console.error("Errore nella decodifica del token:", error);
        logout();
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
        setUser({ id: res.data.id, username: res.data.username });
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
        setUser({ id: res.data.id, username: res.data.username });
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser({ id: null, username: null });
  };

  const handleTaskAction = async (action, ...args) => {
    try {
      return await action(...args);
    } catch (error) {
      console.error(`Errore durante l'operazione su task:`, error);
      throw error;
    }
  };

  const values = {
    user,
    login,
    register,
    logout,
    createTask: (title, description) => handleTaskAction(createTask, title, description, user.id),
    getTasks: () => handleTaskAction(getTasks, user.id),
    getTaskByTitle: (title) => handleTaskAction(getTaskByTitle, title),
    updateTask: (taskId, title, description, completed) => handleTaskAction(updateTask, taskId, title, description, completed),
    deleteTask: (taskId) => handleTaskAction(deleteTask, taskId),
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;
