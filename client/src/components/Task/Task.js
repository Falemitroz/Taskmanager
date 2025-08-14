import React from "react";
import { Input, Form } from "../../components";
import AuthContext from "../../context/AuthContext";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "./Task.module.css";

export default function Task({ taskId, title, description, status, taskListId, onChange, edit }) {
  const { createTask, updateTask, deleteTask } = React.useContext(AuthContext);

  const [taskTitle, setTaskTitle] = React.useState(title || "");
  const [taskDescription, setTaskDescription] = React.useState(description || "");
  const [taskStatus, setTaskStatus] = React.useState(status || false);

  const handleCreate = async () => {
    if (!taskTitle && !taskDescription) return;
    await createTask(taskTitle, taskDescription, taskListId);
    setTaskTitle("");
    setTaskDescription("");
    onChange();
  };

  const handleUpdate = async (field, value) => {
    if (field === "title") setTaskTitle(value);
    if (field === "description") setTaskDescription(value);
    if (field === "completed") setTaskStatus(value);
    await updateTask({ taskId, [field]: value });
    onChange();
  };

  const handleDelete = async () => {
    await deleteTask(taskId);
    onChange();
  };

  // Modal creazione nuova task
  if (!taskId) {
    return (
      <Form title="Nuova Task" onSubmit={handleCreate} onClose={onChange}>
        <Input
          label="Titolo"
          placeholder="Inserisci titolo"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <Input
          type="textarea"
          label="Descrizione"
          placeholder="Inserisci descrizione"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </Form>
    );
  }

  // Edit mode
  if (edit) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.hiddenCheckbox}/> 
        <div className={styles.text}>
          <Input
            type="text"
            value={taskTitle}
            onChange={(e) => handleUpdate("title", e.target.value)}
            placeholder="Inserisci titolo"
          />
          <Input
            type="textarea"
            value={taskDescription}
            onChange={(e) => handleUpdate("description", e.target.value)}
            placeholder="Inserisci descrizione"
          />
        </div>
        <AiOutlineDelete className={styles.delete} onClick={handleDelete}/>
      </div>
    );
  }

  // Task esistente
  return (
    <div className={styles.wrapper}>
      <input
        type="checkbox"
        checked={taskStatus}
        onChange={() => handleUpdate("completed", !taskStatus)}
        className={styles.checkbox}
      />
      <div className={styles.text}>
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}
