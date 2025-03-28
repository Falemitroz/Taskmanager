import axios from "axios";

const API_URL = "http://localhost:5001/api/tasks";

/**
 * Helper function to set Authorization header if token is available
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `${token}` } : {};
};

/**
 * Creates a new task
 */
export const createTask = async (title, description, userId) => {
  try {
    const res = await axios.post(
      `${API_URL}/create`,
      { title, description, userId },
      { headers: getAuthHeaders() }
    );
    return res.data;
  } catch (error) {
    console.error("Errore durante la creazione del task:", error);
    throw error;
  }
};

/**
 * Retrieves tasks for a specific user
 */
export const getTasks = async (userId) => {
  try {
    const res = await axios.get(`${API_URL}/user/${userId}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (error) {
    console.error("Errore durante il recupero dei task:", error);
    throw error;
  }
};

/**
 * Retrieves a task by title
 */
export const getTaskByTitle = async (title) => {
  try {
    const res = await axios.get(`${API_URL}/title/${title}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (error) {
    console.error("Errore durante la ricerca del task:", error);
    throw error;
  }
};

/**
 * Updates a task
 */
export const updateTask = async (taskId, title, description, completed) => {
  try {
    const res = await axios.patch(`${API_URL}/update/${taskId}`, 
      { title, description, completed }, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (error) {
    console.error("Errore durante l'aggiornamento del task:", error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId, completed) => {
  try {
    const res = await axios.patch(`${API_URL}/update-status/${taskId}`, 
      { completed }, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (error) {
    console.error("Errore durante l'aggiornamento del task:", error);
    throw error;
  }
};

/**
 * Deletes a task
 */
export const deleteTask = async (taskId) => {
  try {
    const res = await axios.delete(`${API_URL}/delete/${taskId}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (error) {
    console.error("Errore durante l'eliminazione del task:", error);
    throw error;
  }
};
