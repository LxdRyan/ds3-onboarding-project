import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "~/services/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/util.css"; // Matching styles from the signup page
import "./css/main.css";

const UpdateTask: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>(); // Get task ID from URL
  const navigate = useNavigate();

  // State variables for task fields
  const [taskContents, setTaskContents] = useState("");
  const [name, setName] = useState("");
  const [due_date, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const extractDate = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Returns the date in YYYY-MM-DD format
  };

  // Fetch task details on component mount
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/${taskId}`);
        const task = response.data;
        const date = extractDate(task.due_date);

        // Populate state variables with task data
        setTaskContents(task.contents || "");
        setName(task.name || "");
        setDueDate(date || "");
        setStatus(task.status || "");
        setPriority(task.priority || "");
      } catch (error) {
        console.error("Failed to fetch task details:", error);
        alert("Unable to fetch task details");
      }
    };

    fetchTaskDetails();
  }, [taskId]);


  const handleUpdate = async () => {
    try {
      const updatedTask = {
        contents: taskContents,
        name,
        due_date,
        status,
        priority,
      };

      await axiosInstance.put(`/tasks/${taskId}`, updatedTask);
      alert("Task updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Failed to update task");
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      alert("Task deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="add100-form validate-form">
            <span className="login100-form-title">Update Task</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Title is required"
            >
              <input
                className="input100"
                type="text"
                value={name}
                placeholder="Title"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className="focus-input100"></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Task contents are required"
            >
              <textarea
                className="input100"
                value={taskContents}
                placeholder="Task Contents"
                onChange={(e) => setTaskContents(e.target.value)}
                required
              />
              <span className="focus-input100"></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Due date is required"
            >
              <input
                className="input100"
                type="date"
                value={due_date}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
              <span className="focus-input100"></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Status is required"
            >
              <select
                className="input100"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Select Status</option>
                <option value="Pending">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <span className="focus-input100"></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Priority is required"
            >
              <select
                className="input100"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <span className="focus-input100"></span>
            </div>

            <div className="container-login100-form-btn">
              <button
                type="button"
                onClick={handleUpdate}
                className="login100-form-btn"
              >
                Update Task
              </button>
            </div>

            <div className="container-login100-form-btn mt-2">
              <button
                type="button"
                onClick={handleDelete}
                className="login100-form-btn"
                style={{ backgroundColor: "#dc3545" }}
              >
                Delete Task
              </button>
            </div>

            <div className="text-center p-t-136">
              <button
                type="button"
                className="txt2"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "#007BFF",
                }}
                onClick={() => navigate("/")}
              >
                Back to Home
                <i
                  className="fa fa-long-arrow-right m-l-5"
                  aria-hidden="true"
                ></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
