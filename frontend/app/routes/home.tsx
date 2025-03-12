import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "~/services/axios";
import { Container, Row, Col, Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import "./home.css"; // Custom styles if needed
import "bootstrap/dist/css/bootstrap.min.css";

// Define the Task interface
interface Task {
  id: number;
  name: string;
  contents: string;
  priority: string; // High, Medium, or Low
  owner: string;
  dueDate: string;
  status: string; // e.g., "Completed", "In Progress"
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  // Explicitly type the state as Task[]
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch tasks from API
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/tasks'); 
        console.log(response)// Ensure the response is typed
        setTasks(response.data.contents);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleTaskClick = (taskId: number) => {
    navigate(`/task/${taskId}`);
  };


  







  const renderTasksByPriority = (priority: string) => {
    const filteredTasks = tasks.filter((task) => task.priority === priority); // Filter tasks by priority
    const [taskContents, setTaskContents] = useState("");
    const [name, setName] = useState("");
    const [due_date, setDueDate] = useState("");
    const [status, setStatus] = useState("");


    const handleUpdate = async (taskId) => {
      try {
        // const [taskContents, setTaskContents] = useState("");
        // const [name, setName] = useState("");
        // const [due_date, setDueDate] = useState("");
        // const [status, setStatus] = useState("");
        const updatedTask = {
          contents: 
          taskContents,
          name,
          due_date,
          status,
          priority,
        };
        console.log("updating")
        console.log(updatedTask)
        await axiosInstance.put(`/tasks/${taskId}`, updatedTask);
        alert("Task updated successfully");
        navigate("/home");
      } catch (error) {
        console.error("Failed to update task:", error);
        alert("Failed to update task");
      }
    };



    return filteredTasks.map((task) => (
      <Row key={task.id} className="align-items-center py-2 border-bottom">
        <Col xs={1}>
          <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="30" height="30" fill="grey" />
          </svg>
        </Col>
        <Col
          xs={3}
          className="task-title"
          style={{ cursor: "pointer" }}
          onClick={() => handleTaskClick(task.id)}
        >
          <strong>{task.name}</strong>
        </Col>
        <Col xs={2}>{task.owner}</Col>
        <Col xs={2}>{task.dueDate}</Col>
        <Col xs={2}>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size="sm">
              {task.status}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => {setStatus("Completed"); 
                setName(task.name); 
                setTaskContents(task.contents); 
                setDueDate(task.dueDate); 
                handleUpdate(task.id)}}>Completed</Dropdown.Item>
              <Dropdown.Item onClick={() => {setStatus("In Progress"); 
                setName(task.name); 
                setTaskContents(task.contents); 
                setDueDate(task.dueDate); 
                handleUpdate(task.id)}}>In Progress</Dropdown.Item>
              <Dropdown.Item onClick={() => {setStatus("Not Started"); 
                setName(task.name); 
                setTaskContents(task.contents); 
                setDueDate(task.dueDate); 
                handleUpdate(task.id)}}>Not Started</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    ));
  };

  return (
    <Container className="py-4">
      {/* Header */}
      <Navbar bg="light" className="mb-4 border-bottom">
        <Container>
          <Navbar.Brand href="/home">
            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="30" height="30" fill="black" />
            </svg>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Button
              variant="primary"
              onClick={() => handleNavigation("/")}
            >
              Sign Out
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Task List */}
      <Container>
        <h1 className="mb-4">Task List</h1>

        {/* High Priority Tasks */}
        <section className="mb-4">
          <h2 className="mb-3">High Priority</h2>
          {renderTasksByPriority("High")}
        </section>

        {/* Medium Priority Tasks */}
        <section className="mb-4">
          <h2 className="mb-3">Medium Priority</h2>
          {renderTasksByPriority("Medium")}
        </section>

        {/* Low Priority Tasks */}
        <section>
          <h2 className="mb-3">Low Priority</h2>
          {renderTasksByPriority("Low")}
        </section>
      </Container>

      <Button
        variant="outline-secondary"
        onClick={() => handleNavigation("/add")}
      >
        Add Task
      </Button>
    </Container>
  );
};

export default Home;
