import React from "react";
import * as API from "../services/api";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

  const handleAction = async (action, ...args) => {
    try {
      return await action(...args);
    } catch (error) {
      console.error(`Errore durante l'operazione su task:`, error);
      throw error;
    }
  };

  const values = {
    createTask: (title, description, taskListId) => handleAction(API.createTask, title, description, taskListId),
    getTasks: (taskListId) => handleAction(API.getTasks, taskListId),
    updateTask: ({taskId, title, description, completed}) => handleAction(API.updateTask, taskId, title, description, completed),
    deleteTask: (taskId) => handleAction(API.deleteTask, taskId),
    
    createTaskList: (name) => handleAction(API.createTaskList, name),
    getTaskLists: () => handleAction(API.getTaskLists),
    getTaskListByTitle: (name) => handleAction(API.getTaskListByName, name),
    updateTaskList: (taskListId, name) => handleAction(API.updateTaskList, taskListId, name),
    deleteTaskList: (taskListId) => handleAction(API.deleteTaskList, taskListId),
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;
