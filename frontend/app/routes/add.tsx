import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../services/LayoutAdd";
import axiosInstance from "../services/axios";
import Button from "../services/Button";

const AddTask: React.FC = () => {
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");
  const [creator_id, setCreatorID] = useState("");
  const [due_date, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      name,
      contents,
      creator_id,
      due_date,
      status,
      priority,
    };
    console.log("New Task:", newTask);

    axiosInstance.post("/tasks", newTask);
    alert("Task added successfully!");
    navigate("/home");
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

        <div className="wrap-input100 validate-input" data-validate="Creator Name is required">
          <input
            className="input100"
            type="text"
            placeholder="Creator"
            value={creator_id}
            onChange={(e) => setCreatorID(e.target.value)}
            required
          />
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
          <span style={{margin:'20px'}}></span>
          <Button label="Back" onClick={handleBack} className="btn-secondary" />
        </div>
      </form>
    </Layout>
  );
};

export default AddTask;
