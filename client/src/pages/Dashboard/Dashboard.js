import React from "react";
import { Navbar, TaskList } from "../../components";
import AuthContext from "../../context/AuthContext";
import styles from './Dashboard.module.css';
import { IoIosAddCircle } from "react-icons/io";

export default function Dashboard() {
    const { getTaskLists } = React.useContext(AuthContext);
    const [newList, setNewList] = React.useState(false);
    const [taskLists, setTaskLists] = React.useState([]);

    const fetchTaskLists = React.useCallback(async () => {
        try {
            const response = await getTaskLists();
            if (response) setTaskLists(response);
            setNewList(false);
        } catch (error) {
            console.error("Errore durante il recupero dei taskList:", error);
        }
    }, [getTaskLists]);

    React.useEffect(() => {
        fetchTaskLists();
    }, [fetchTaskLists]);

    return (
        <>
            <Navbar />
            <div className={styles.dashboard}>
                <h1>Benvenuto!</h1>
                <p>Gestisci facilmente i tuoi task quotidiani.</p>
                
                {/* <Divider color='#388E3C' size='3px'/> */}
                

                <div className={styles.body}>
                    <div className={styles.newList}>
                        <IoIosAddCircle onClick={() => setNewList(true)} style={{fontSize:'8rem'}}/>
                    </div>
                    {newList && <TaskList onChange={fetchTaskLists}/>}
                    {taskLists.length !==0 && taskLists.map((list) => 
                        <TaskList 
                            key={list.id} 
                            taskListId={list.id} 
                            title={list.name}
                            onChange={fetchTaskLists}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
