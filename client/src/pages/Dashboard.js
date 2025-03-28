import { useContext } from "react";
import NavBar from "../components/Navbar";
import TaskList from "../components/TaskList";
import AuthContext from "../context/AuthContext";
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
            <NavBar />
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">
                        <b>Benvenuto, {user.username}!</b>
                    </h1>
                    <p className="dashboard-subtitle">Gestisci facilmente i tuoi task quotidiani.</p>
                </div>

                <TaskList />
            </div>
        </>
    );
};

export default Dashboard;
