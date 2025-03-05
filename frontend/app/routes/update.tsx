import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateTask: React.FC = () => {
    const [task, setTask] = useState('');
    const navigate = useNavigate();

    const handleUpdate = () => {
        // Logic to update the task goes here
        alert('Task updated');
        navigate('/');
    };

    return (
        <div>
            <h1>Update Task</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Update your task"
            />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default UpdateTask;