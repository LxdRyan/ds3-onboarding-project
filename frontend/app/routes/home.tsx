import type { Route } from "./+types/home";
import { useNavigate } from "react-router-dom";
import "./home.css"; // Import the CSS file
import {
  Container,
  Navbar
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axiosInstance from '~/services/axios';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Task List" },
    { name: "description", content: "A list of tasks to complete." },
  ];
}

export default function Home() {

  const mockTasks = [
    { id: 1, title: "Task 1", content: "This is Task 1's content" },
    { id: 2, title: "Task 2", content: "This is Task 2's content" },
    { id: 3, title: "Task 3", content: "This is Task 3's content" },
  ];

  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tasks, setTasks] = useState(mockTasks);


  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await axiosInstance.get('/tasks');
  //       setTasks(response.data);
  //     } catch (error) {
  //       console.error('Failed to fetch tasks:', error);
  //     }
  //   };

  //   fetchTasks();
  // }, []);


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
    <div className="wtf">
        <header id="header1">
          <Navbar>
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
                    <ul className="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                      <li onClick={() => handleNavigation("/profile")}>Profile</li>
                      <li onClick={handleSignOut}>Sign Out</li>
                    </ul>
                  )}  
              </div>
            </div>
          </Navbar>
        </header>
      <Container id="list_container">
        <ul>
          {tasks.map((task) => (
            <Container className="task_item">
              <li key={task.id} onClick={() => handleTaskClick(task.id)} style={{ cursor: 'pointer' }}>
                <p>{task.title}: {task.content}</p>
              </li>
            </Container>
          ))}
        </ul>
      </Container>
    </div>
    )

  
  
  }
