import type { Route } from "./+types/home";
import { useNavigate } from "react-router-dom";
import "./home.css"; // Import the CSS file
import { useState, useEffect } from "react";
import axiosInstance from '~/services/axios';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Task List" },
    { name: "description", content: "A list of tasks to complete." },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tasks, setTasks] = useState([]);



  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleSignOut = () => {
    // Add your sign out logic here
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDropdownOpen(false);
  };

  const handleAddTask = () => {
    navigate("/add");
  };

  const handleTaskClick = (taskId: number) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <div className="container">
      <div className="navbar">
        <h1>Task List</h1>
        <div className="navbar-right">
          <button onClick={handleAddTask} className="add-task-button">
            Add Task
          </button>
          <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-button">
              Menu
            </button>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li onClick={() => handleNavigation("/profile")}>Profile</li>
                  <li onClick={handleSignOut}>Sign Out</li>
                </ul>
              )}  
          </div>
        </div>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} onClick={() => handleTaskClick(task.id)} style={{ cursor: 'pointer' }}>
            <p>{task.title}: {task.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
