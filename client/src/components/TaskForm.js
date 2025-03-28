import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { FaPencil } from "react-icons/fa6";
import "../styles/TaskForm.css"; // Import del CSS

const TaskForm = ({ task, updateTaskList }) => {
  const { createTask, updateTask, deleteTask } = useContext(AuthContext);

  // Stato unificato per tutti i campi
  const [fields, setFields] = useState({
    title: task?.title || "",
    description: task?.description || "",
    completed: task?.completed || false,
  });
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    if (task) {
      setFields({
        title: task.title,
        description: task.description,
        completed: task.completed,
      });
    }
  }, [task]);

  const handleCreate = async (e) => {
    e.preventDefault();
    await createTask(fields.title, fields.description);
    setFields({ title: "", description: "", completed: false });
    updateTaskList();
  };

  const handleUpdate = async (field, value) => {
    const updatedTask = { ...fields, [field]: value };
    await updateTask(task.id, updatedTask.title, updatedTask.description, updatedTask.completed);
    updateTaskList();
    setEditingField(null);
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    updateTaskList();
  };

  const renderField = (field, placeholder) => (
    <div className="task-field">
      {editingField === field ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate(field, fields[field]);
          }}
          className="editing-task-field"
        >
          {field === "description" ? (
            <textarea
              value={fields[field]}
              onChange={(e) => setFields({ ...fields, [field]: e.target.value })}
              placeholder={placeholder}
            />
          ) : (
            <input
              type="text"
              value={fields[field]}
              onChange={(e) => setFields({ ...fields, [field]: e.target.value })}
              placeholder={placeholder}
            />
          )}
          <button type="submit">Salva modifiche</button>
        </form>
      ) : (
        <div className="task-field-display">
          <span>{fields[field]}</span>
          <FaPencil onClick={() => setEditingField(field)} />
        </div>
      )}
    </div>
  );

  return (
    <div className="task-container">
      {task ? (
        <div className="task-content">
          <div className="task-title">
            {renderField("title", "Titolo")}
          </div>
          <div className="task-description">
            <span>Descrizione:</span>
            <div className="description-box">
              {renderField("description", "Descrizione")}
            </div>
          </div>
          <div className="task-completed">
            <input
              type="checkbox"
              checked={fields.completed}
              onChange={() =>
                handleUpdate("completed", !fields.completed)
              }
              className="checkbox"
            />
            <label>Completato</label>
          </div>
          <div className="delete-button">
            <button onClick={handleDelete}>Elimina</button>
          </div>
        </div>
      ) : (
        <form className="new-task-form" onSubmit={handleCreate}>
          <h1><strong>Aggiungi una nuova task</strong></h1>
          <div className="new-task-field">
            <input
              type="text"
              value={fields.title}
              onChange={(e) =>
                setFields({ ...fields, title: e.target.value })
              }
              placeholder="Titolo"
              required
            />
          </div>
          <div className="new-task-field">
            <textarea
              value={fields.description}
              onChange={(e) =>
                setFields({ ...fields, description: e.target.value })
              }
              placeholder="Descrizione"
            />
          </div>
          <button type="submit">Conferma</button>
        </form>
      )}
    </div>
  );
};

export default TaskForm;
