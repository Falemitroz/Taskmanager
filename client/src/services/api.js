import axios from "axios";

const API_URL = "http://localhost:5001/api";

export const createTask = async (title, description, taskListId) => {
  try {
    const res = await axios.post(
      `${API_URL}/tasks/create`,
      { title, description, taskListId },
    );
    return res.data;
  } catch (error) {
    console.error("Errore durante la creazione del task:", error);
    throw error;
  }
};

export const getTasks = async (taskListId) => {
  try {
    const res = await axios.get(`${API_URL}/tasks/${taskListId}`);
    return res.data;
  } catch (error) {
    console.error("Errore durante il recupero dei task:", error);
    throw error;
  }
};

export const updateTask = async (taskId, title, description, completed) => {
  try {
    const res = await axios.patch(`${API_URL}/tasks/update/${taskId}`, 
      { title, description, completed });
    return res.data;
  } catch (error) {
    console.error("Errore durante l'aggiornamento del task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const res = await axios.delete(`${API_URL}/tasks/delete/${taskId}`);
    return res.data;
  } catch (error) {
    console.error("Errore durante l'eliminazione del task:", error);
    throw error;
  }
};


// 
export const createTaskList = async (name) => {
  try {
    const res = await axios.post(
      `${API_URL}/taskLists/create`,
      { name },
    );
    return res.data;
  } catch (error) {
    console.error("Errore durante la creazione del taskList:", error);
    throw error;
  }
};

export const getTaskLists = async () => {
  try {
    const res = await axios.get(`${API_URL}/taskLists`);
    return res.data;
  } catch (error) {
    console.error("Errore durante il recupero dei taskList:", error);
    throw error;
  }
};

export const getTaskListByName = async (name) => {
  try {
    const res = await axios.get(`${API_URL}/taskLists/name/${name}`);
    return res.data;
  } catch (error) {
    console.error("Errore durante la ricerca del taskList:", error);
    throw error;
  }
};

export const updateTaskList = async (taskListId, name ) => {
  try {
    const res = await axios.patch(`${API_URL}/taskLists/update/${taskListId}`, 
      { name });
    return res.data;
  } catch (error) {
    console.error("Errore durante l'aggiornamento del taskList:", error);
    throw error;
  }
};

export const deleteTaskList = async (taskListId) => {
  try {
    const res = await axios.delete(`${API_URL}/taskLists/delete/${taskListId}`);
    return res.data;
  } catch (error) {
    console.error("Errore durante l'eliminazione del taskList:", error);
    throw error;
  }
};
