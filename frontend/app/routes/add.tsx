import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTask.css'; // Import the CSS file
import axiosInstance from '../services/axios';

const AddTask: React.FC = () => {
    const [taskName, setTaskName] = useState('');
    const [taskContents, setTaskContents] = useState('');
    const [creator, setCreator] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask = {
            taskName,
            taskContents,
            creator,
            dueDate,
            status,
            priority,
        };
        console.log('New Task:', newTask);
        // Add logic to save the task
        axiosInstance.post('/tasks/0', newTask);
        alert('Task added');
        navigate('/');
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <h1>Add New Task</h1>
            <form className='task-form' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Task Name:</label>
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Task Contents:</label>
                    <textarea
                        value={taskContents}
                        onChange={(e) => setTaskContents(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Creator:</label>
                    <input
                        type="text"
                        value={creator}
                        onChange={(e) => setCreator(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Due Date:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                        style={{ outline: '1px solid #000' }}
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Priority:</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                        style={{ outline: '1px solid #000' }}
                    >
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                
                <button type="submit">Add Task</button>
                <span style={{ margin: '0 10px' }}></span>
                <button type="button" onClick={handleBack}>Back</button>
            </form>
        </div>
    );
};

export default AddTask;