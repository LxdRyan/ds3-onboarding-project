import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../services/LayoutAdd";
import axiosInstance from "../services/axios";
import Button from "../services/Button";

interface User {
  id: string;
  name: string;
}

const AddTask: React.FC = () => {
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");
  const [creator_id, setCreatorID] = useState("");
  const [due_date, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [users, setUsers] = useState<User[]>([]); // Define users as an array of User objects

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from API when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        console.log(response)
        setUsers(response.data.data); // Assuming response.data is an array of user objects
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      name,
      contents,
      creator_id, // Save the selected creator_id
      due_date,
      status,
      priority,
    };

    try {
      await axiosInstance.post("/tasks", newTask);
      alert("Task added successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Failed to add task:", error);
      alert("Failed to add the task.");
    }
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <Layout>
      <form className="add100-form" onSubmit={handleSubmit}>
        <span className="login100-form-title">Add New Task</span>

        <div className="wrap-input100 validate-input" data-validate="Task Name is required">
          <input
            className="input100"
            type="text"
            placeholder="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input" data-validate="Task Contents are required">
          <textarea
            className="input100"
            placeholder="Task Contents"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            required
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input" data-validate="Creator is required">
          <select
            className="input100"
            value={creator_id}
            onChange={(e) => setCreatorID(e.target.value)}
            required
          >
            <option value="">Select Creator</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input" data-validate="Due Date is required">
          <input
            className="input100"
            type="date"
            value={due_date}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input" data-validate="Status is required">
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

        <div className="wrap-input100 validate-input" data-validate="Priority is required">
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
          <Button label="Add Task" onClick={handleSubmit} />
          <span style={{ margin: "20px" }}></span>
          <Button label="Back" onClick={handleBack} className="btn-secondary" />
        </div>
      </form>
    </Layout>
  );
};

export default AddTask;
