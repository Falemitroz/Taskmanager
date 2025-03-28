import React, { useState, useEffect, useContext } from "react";
import TaskForm from "./TaskForm";
import AuthContext from "../context/AuthContext";
import { FaSearch } from "react-icons/fa";
import '../styles/TaskList.css'; 
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const { getTasks, getTaskByTitle } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [tasksCopy, setTasksCopy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        if (response) {
          const sortedTasks = response.sort((a, b) => a.title.localeCompare(b.title));
          setTasks(sortedTasks);
          setTasksCopy(sortedTasks);
        }
        setLoading(false);
      } catch (error) {
        console.error("Errore durante il recupero dei task:", error);
        // Se il token non è valido o mancante, reindirizza alla pagina di login
        if (error.response && error.response.status === 401) {
          alert("Sessione scaduta. Autenticati nuovamente per continuare.");
          navigate("/authForm");
        }
      }
    };
  
    fetchTasks();
  }, [getTasks, navigate]); 

  const searchTask = async (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setTasks(tasksCopy); // Se la ricerca è vuota, ripristina tutti i task
    } else {
      setLoading(true);
      const response = await getTaskByTitle(title);
      if (response) {
        const sortedTasks = response.sort((a, b) => a.title.localeCompare(b.title));
        setTasks(sortedTasks); // Mostra i task trovati
      } else {
        setTasks(tasksCopy); // Se nessun task trovato, ripristina la lista completa
      }
      setTitle("");
      setLoading(false);
    }
  };

  const updateTaskList = async () => {
    const updatedTasks = await getTasks();
    const sortedTasks = updatedTasks.sort((a, b) => a.title.localeCompare(b.title));
    setTasks(sortedTasks);
  };

  return (
    <div className="task-list-container">
      <h2>Le tue attività</h2>
      <form onSubmit={searchTask} className="task-search-form">
        <FaSearch />
        <input 
          type="text"
          placeholder="Cerca..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="task-search-input"
        />
      </form>

      {loading ? (
        <p className="loading">Caricamento...</p>
      ) : tasks.length === 0 ? (
        <>
          <p className="no-tasks">Non ci sono task disponibili.</p>
          <div>
            <TaskForm task={null} updateTaskList={updateTaskList} />
          </div>
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
