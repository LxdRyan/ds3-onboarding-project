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
        const response = await axiosInstance.get('/tasks'); // Ensure the response is typed
        setTasks(response.data);
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
    return filteredTasks.map((task) => (
      <Row key={task.id} className="align-items-center py-2 border-bottom">
        <Col xs={1}>
          <img src="grey_square.svg" alt="Indicator" width="30" height="30" />
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
              <Dropdown.Item>Completed</Dropdown.Item>
              <Dropdown.Item>In Progress</Dropdown.Item>
              <Dropdown.Item>Pending Dependency</Dropdown.Item>
              <Dropdown.Item>Not Started</Dropdown.Item>
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
          <Navbar.Brand href="/">
            <img src="black_square.svg" alt="Logo" width="30" height="30" />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Button
              variant="outline-primary"
              className="me-2"
              onClick={() => handleNavigation("/profile")}
            >
              Profile
            </Button>
            <Button
              variant="primary"
              onClick={() => handleNavigation("/login")}
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
