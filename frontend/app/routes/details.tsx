import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import axiosInstance from '~/services/axios';
import "./details.css";

const TaskDetails: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<{ name: string; contents: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error("Failed to fetch task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleEdit = () => {
    navigate(`/update/${taskId}`);
  };

  const handleBack = () => {
    navigate("/home");
  };

  if (!task) {
    return (
      <Container className="text-center py-5">
        <h4>Loading...</h4>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">

      <Container>
        <Row className="mb-4">
          <Col>
            <h1>{task.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <p>{task.contents}</p>
          </Col>
          <Col md={4} className="text-center">
            <Image
              src="green_square.svg"
              alt="Task Indicator"
              width="50"
              height="50"
              className="mb-2"
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleBack}>
              Back to Home
            </Button>
            <Button variant="warning" onClick={handleEdit}>
              Edit Task
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default TaskDetails;
