import type { Route } from "./+types/home";
import { useNavigate } from "react-router-dom";
import "./home.css"; // Import the CSS file
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Task List" },
    { name: "description", content: "A list of tasks to complete." },
  ];
}

const tasks = [
  { id: 1, title: "Task 1", description: "Complete the onboarding project" },
  { id: 2, title: "Task 2", description: "Review the code" },
  { id: 3, title: "Task 3", description: "Submit the project" },
];

export default function Home() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
          <li key={task.id}>
            <p>{task.title}: {task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
