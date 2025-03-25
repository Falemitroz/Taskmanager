import React, { useState, useEffect, useContext } from "react";
import TaskForm from "./TaskForm";
import AuthContext from "../context/AuthContext";
// import '../styles/TaskList.css';

const TaskList = () => {
  const { get_Tasks, get_TaskByTitle } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [tasksCopy, setTasksCopy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");


  useEffect(() => {
    const fetchTasks = async () => {
      const response = await get_Tasks();
      if (response) {
        setTasks(response);
        setTasksCopy(response);
      }
      setLoading(false);
    };

    fetchTasks();
  }, [get_Tasks]);

  const searchTask = async (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setTasks(tasksCopy); // Se la ricerca è vuota, ripristina tutti i task
    } else {
      setLoading(true);
      const response = await get_TaskByTitle(title);
      if (response) {
        setTasks(response); // Mostra i task trovati
      } else {
        setTasks(tasksCopy); // Se nessun task trovato, ripristina la lista completa
      }
      setLoading(false);
    }
  };

  const updateTaskList = async () => {
    const updatedTasks = await get_Tasks();
    setTasks(updatedTasks);
    setTasksCopy(updatedTasks);
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <form onSubmit={searchTask}>
        <input 
          type="text"
          placeholder="Cerca..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
      {loading ? (
        <p>Caricamento...</p>
      ) : tasks.length === 0 ? (
        <>
          <p>Non ci sono task disponibili.</p>
          <TaskForm task={null} updateTaskList={updateTaskList}/>
        </>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskForm task={task} updateTaskList={updateTaskList}/>
            </li>
          ))}
          <li>
            <TaskForm task={null} updateTaskList={updateTaskList}/>
          </li>
        </ul>
      )}
    </div>
  );
};

export default TaskList;