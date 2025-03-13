import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "~/services/axios";
import { Container, Row, Col, Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import "./home.css"; // Custom styles if needed
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/util.css";
import "./css/main.css";

// Define the Task interface
interface Task {
  id: number;
  name: string;
  contents: string;
  priority: string; // High, Medium, or Low
  creator_id: number;
  due_date: string;
  status: string; // e.g., "Completed", "In Progress"
}

interface UpdateTask {
  name: string;
  contents: string;
  priority: string; // High, Medium, or Low
  creator_id: number;
  due_date: string;
  status: string; // e.g., "Completed", "In Progress"
}

interface DisplayTask {
  id: number;
  name: string;
  contents: string;
  priority: string; // High, Medium, or Low
  creator_id: number;
  creator_name: string;
  due_date: string;
  status: string; // e.g., "Completed", "In Progress"
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  // Explicitly type the state as Task[]
  const [tasks, setTasks] = useState<DisplayTask[]>([]);

  const fetchUsers = async (id: number) => {
    try{
      const usersResponse = await axiosInstance.get(`/users/${id}`)
      return(usersResponse.data.contents.name)
    } catch (error) {
      console.error("Failed to get users", error)
      return ""
    }
  }

  useEffect(() => {
    // Fetch tasks from API
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/tasks'); 
        console.log(response); // Ensure the response is typed

        const tasksWithCreators = await Promise.all(
          response.data.contents.map(async (task: Task): Promise<DisplayTask> => {
            return {
              ...task,
              creator_name: await fetchUsers(task.creator_id),
            };
          })
        );

        setTasks(tasksWithCreators);
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

  const handleUpdate = async (taskId: number, updatedTask: UpdateTask) => {
    try {
      console.log("updating");
      console.log(updatedTask);
      await axiosInstance.put(`/tasks/${taskId}`, updatedTask);
      alert("Task updated successfully");
      navigate("/home");
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Failed to update task");
    }
  };

  const handleStatusChange = async (task: Task, newStatus: string) => {
    const updatedTask: UpdateTask = {
      name: task.name,
      contents: task.contents,
      creator_id: task.creator_id,
      due_date: task.due_date,
      status: newStatus,
      priority: task.priority,
    };

    await handleUpdate(task.id, updatedTask);
    window.location.reload();
  };

  const handleIndicator = (status: string) => {
    if (status === "Completed") {
      return (
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="30" height="30" fill="green" />
        </svg>
      );
    } else {
      return (
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="30" height="30" fill="grey" />
        </svg>
      );
    }
  };

  const renderTasksByPriority = (priority: string) => {
    const filteredTasks = tasks.filter((task) => task.priority === priority); // Filter tasks by priority

    return filteredTasks.map((task) => (
      <Row key={task.id} className="align-items-center py-2 border-bottom">
        <Col xs={1}>
          {handleIndicator(task.status)}
        </Col>
        <Col
          xs={3}
          className="task-title"
          style={{ cursor: "pointer" }}
          onClick={() =>
            handleTaskClick(task.id)}
        >
          <strong>{task.name}</strong>
        </Col>
        <Col xs={2}>Creator: {task.creator_name}</Col>
        <Col xs={2}>Due: {(task.due_date.split("T"))[0]}</Col>
        <Col xs={2}>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size="sm">
              {task.status}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleStatusChange(task, "Completed")}>Completed</Dropdown.Item>
              <Dropdown.Item onClick={() => handleStatusChange(task, "In Progress")}>In Progress</Dropdown.Item>
              <Dropdown.Item onClick={() => handleStatusChange(task, "Not Started")}>Not Started</Dropdown.Item>
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
              variant="outline-primary"
              className="me-2"
              onClick={() => handleNavigation("/profile")}
            >
              Profile
            </Button>
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
