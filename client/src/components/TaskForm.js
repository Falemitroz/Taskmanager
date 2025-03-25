import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { FaPencil } from "react-icons/fa6";
// import '../styles/TaskForm.css';

const TaskForm = ({ task, updateTaskList }) => {
  const { create_Task, update_Task, delete_Task } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [update, setUpdate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCompleted(task.completed);
    }
  }, [task]);

  const createTask = async (e) => {
    e.preventDefault();
    await create_Task(title, description);
    setTitle("");
    setDescription("");
    updateTaskList(); // Aggiorna la lista dopo la creazione
  };

  const updateTask = async (e, field) => {
    e.preventDefault();
    setUpdate("");
    let updatedTask = { id: task.id };

    if (field === "title") {
      updatedTask.title = title;
    } else if (field === "description") {
      updatedTask.description = description;
    } else if (field === "completed") {
      const newCompletedState = e.target.checked;
      setCompleted(newCompletedState);
      updatedTask.completed = newCompletedState;
    }

    await update_Task(updatedTask.id, updatedTask.title, updatedTask.description, updatedTask.completed);
    updateTaskList(); // Aggiorna la lista dopo l'aggiornamento
  };

  const deleteTask = async () => {
    await delete_Task(task.id);
    updateTaskList(); // Aggiorna la lista dopo la cancellazione
  };

  function newTaskForm() {
    return (
      <form className="task-form">
        <h1><strong>Aggiungi una nuova task</strong> </h1>
        {renderInput()}
        {renderTextarea()}
        <button onClick={createTask}>Conferma</button>
      </form>
    );
  }

  function renderTask() {
    return (
      <div className="task-form">
        {update === "updateTitle" ? (
          <form onSubmit={(e) => updateTask(e, "title")}>
            {renderInput()}
          </form>
        ) : (
          <>
            <h1><strong>{title}</strong></h1>
            <FaPencil onClick={() => setUpdate("updateTitle")} />
          </>
        )}

        {update === "updateDescription" ? (
          <form>
            {renderTextarea()}
            <button onClick={(e) => updateTask(e, "description")}>Salva modifiche</button>
          </form>
        ) : (
          <>
            <p>{description}</p>
            <FaPencil onClick={() => setUpdate("updateDescription")} />
          </>
        )}

        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => updateTask(e, "completed")}
          />
          Completato
        </label>
        <button onClick={deleteTask}>Elimina</button>
      </div>
    );
  }

  function renderInput() {
    return (
      <input
        type="text"
        placeholder="Titolo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    );
  }

  function renderTextarea() {
    return (
      <textarea
        placeholder="Descrizione"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    );
  }

  return (
    <div>
      {!task ? (<>{newTaskForm()}</>) : (<>{renderTask()}</>)}
    </div>
  );
};

export default TaskForm;
