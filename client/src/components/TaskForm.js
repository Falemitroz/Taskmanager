import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { FaPencil } from "react-icons/fa6";

const TaskForm = ({ task, updateTaskList }) => {
  const { createTask, updateTask, deleteTask } = useContext(AuthContext);

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [completed, setCompleted] = useState(task?.completed || false);
  const [editingField, setEditingField] = useState(null); // Per gestire quale campo modificare

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCompleted(task.completed);
    }
  }, [task]);

  const handleCreate = async (e) => {
    e.preventDefault();
    await createTask(title, description);
    resetForm();
    updateTaskList();
  };

  const handleUpdate = async (field, value) => {
    const updatedTask = { id: task.id, [field]: value };
    await updateTask(updatedTask.id, updatedTask.title, updatedTask.description, updatedTask.completed);
    updateTaskList();
    setEditingField(null); // Esci dalla modalità di modifica
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    updateTaskList();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
  };

  const renderInput = (value, setter, placeholder) => (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setter(e.target.value)}
      required
    />
  );

  const renderTextarea = (value, setter) => (
    <textarea
      placeholder="Descrizione"
      value={value}
      onChange={(e) => setter(e.target.value)}
    />
  );

  return (
    <div>
      {task ? (
        <>
          {editingField === "title" ? (
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate("title", title); }}>
              {renderInput(title, setTitle, "Titolo")}
            </form>
          ) : (
            <>
              <h1><strong>{title}</strong></h1>
              <FaPencil onClick={() => setEditingField("title")} />
            </>
          )}

          {editingField === "description" ? (
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate("description", description); }}>
              {renderTextarea(description, setDescription)}
              <button type="submit">Salva modifiche</button>
            </form>
          ) : (
            <>
              <p>{description}</p>
              <FaPencil onClick={() => setEditingField("description")} />
            </>
          )}

          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={() => handleUpdate("completed", !completed)}
            />
            Completato
          </label>
          <button onClick={handleDelete}>Elimina</button>
        </>
      ) : (
        <form onSubmit={handleCreate}>
          <h1><strong>Aggiungi una nuova task</strong></h1>
          {renderInput(title, setTitle, "Titolo")}
          {renderTextarea(description, setDescription)}
          <button type="submit">Conferma</button>
        </form>
      )}
    </div>
  );
};

export default TaskForm;