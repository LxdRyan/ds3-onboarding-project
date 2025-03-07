import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '~/services/axios';

const UpdateTask: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>(); // Get task ID from URL
    const navigate = useNavigate();

    // State variables for task fields
    const [taskContents, setTaskContents] = useState('');
    const [creator, setCreator] = useState('');
    const [due_date, setDueDate] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');

    // Fetch task details on component mount
    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const response = await axiosInstance.get(`/tasks/${taskId}`);
                const task = response.data;
                console.log('Task:', task);

                // Populate state variables with task data
                setTaskContents(task.contents || '');
                setCreator(task.creator || '');
                setDueDate(task.due_date || '');
                setStatus(task.status || '');
                setPriority(task.priority || '');
            } catch (error) {
                console.error('Failed to fetch task details:', error);
                alert('Unable to fetch task details');
            }
        };

        fetchTaskDetails();
    }, [taskId]);

    const handleUpdate = async () => {
        try {
            const updatedTask = {
                contents: taskContents,
                creator,
                due_date,
                status,
                priority,
            };

            await axiosInstance.put(`/tasks/${taskId}`, updatedTask);
            alert('Task updated successfully');
            navigate('/');
        } catch (error) {
            console.error('Failed to update task:', error);
            alert('Failed to update task');
        }
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/tasks/${taskId}`);
            alert('Task deleted successfully');
            navigate('/');
        } catch (error) {
            console.error('Failed to delete task:', error);
            alert('Failed to delete task');
        }
    };

    return (
        <body style={{ height: '100vh', backgroundColor: '#f0f2f5' }}>
            <div style={{
                backgroundColor: 'white',
                color: 'black',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '400px',
                margin: 'auto',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <h1 style={{ textAlign: 'center' }}>Update Task</h1>
                <button
                    onClick={handleDelete}
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        cursor: 'pointer',
                        marginBottom: '10px',
                    }}
                >
                    Delete
                </button>
                <div className="form-group">
                    <label>Task Contents:</label>
                    <textarea
                        value={taskContents}
                        onChange={(e) => setTaskContents(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            marginBottom: '10px',
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Creator:</label>
                    <input
                        type="text"
                        value={creator}
                        onChange={(e) => setCreator(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            marginBottom: '10px',
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Due Date:</label>
                    <input
                        type="date"
                        value={due_date}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            marginBottom: '10px',
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            marginBottom: '10px',
                        }}
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
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            marginBottom: '10px',
                        }}
                    >
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <button
                    onClick={handleUpdate}
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        cursor: 'pointer',
                        marginBottom: '10px',
                    }}
                >
                    Update
                </button>
                <span style={{ display: 'block', textAlign: 'center', marginBottom: '10px' }}>or</span>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        cursor: 'pointer',
                    }}
                >
                    Back to Home
                </button>
            </div>
        </body>
    );
};

export default UpdateTask;
