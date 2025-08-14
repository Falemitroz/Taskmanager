import React from "react";
import styles from './TaskList.module.css'; 
import { Task, Form, Input } from '../../components';
import AuthContext from "../../context/AuthContext";

import { LuPencil } from "react-icons/lu";
import { IoIosAddCircle, IoIosClose } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";

const TaskList = ({ title, taskListId, onChange }) => {
  const { createTaskList, updateTaskList, deleteTaskList, getTasks } = React.useContext(AuthContext);
  const [ name, setName ] = React.useState(title || "");
  const [ newTask, setNewTask ] = React.useState(false);
  const [ tasks, setTasks ] = React.useState([]);
  const [ edit, setEdit ] = React.useState(false);

  const fetchTasks = React.useCallback(async () => {
    try {
      const response = await getTasks(taskListId);
      if (response && Array.isArray(response)) {
        setTasks(response);
        setNewTask(false)
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Errore durante il recupero dei task:", error);
    }
  }, [getTasks, taskListId]);
  
  React.useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async () => {
    if (!name) return;
    await createTaskList(name);
    setName("");
    onChange();
  };

  const handleUpdate = async (value) => {
    setName(value);
    await updateTaskList(taskListId, value);
    onChange();
  }

  const handleDelete = async () => {
    await deleteTaskList(taskListId);
    onChange();
  };

  if (!taskListId) {
    return (
      <Form title="Nuova lista" onSubmit={handleCreate} onClose={onChange}>
        <Input 
          label="Nome"
          placeholder="Inserisci nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form>
    );
  }

  function renderEditMode() {
    return (
      <>
        <Input
          type="text"
          value={name}
          onChange={(e) => handleUpdate(e.target.value)}
          placeholder="Inserisci titolo"
          required
        />
          
        <div>
          <AiOutlineDelete className={styles.delete} onClick={handleDelete}/>
          <IoIosClose className={styles.edit} onClick={() => setEdit(false)}/>
        </div> 
      </>
    )
  };
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {edit ? renderEditMode() : (
          <>
            <h2>{title}</h2> 
            <LuPencil className={styles.edit} onClick={() => setEdit(true)}/>
          </>)
        }
      </div>
      
      <div className={styles.body}>
        {newTask && (
          <Task 
            taskListId={taskListId} 
            onChange={fetchTasks} 
          />
        )}

        {tasks.length !== 0 && tasks.map((task) => 
          <Task 
            key={task.id} 
            taskId={task.id}
            title={task.title} 
            description={task.description}
            status={task.completed}
            onChange={fetchTasks}
            edit={edit}
          />)
        }
      </div>
      {!edit && 
        <div className={styles.footer}>
          <IoIosAddCircle onClick={() => setNewTask(true)} className={styles.addTask}/>
        </div>
      }
    </div>
  );
};

export default TaskList;