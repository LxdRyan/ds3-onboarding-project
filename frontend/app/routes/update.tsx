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
        <body style={{height: '100vh', backgroundColor: '#f0f2f5'}}>
            <div style={{ backgroundColor: 'white', color: 'black', padding: '20px', borderRadius: '8px', maxWidth: '400px', margin: 'auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <h1 style={{ textAlign: 'center' }}>Update Task</h1>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Update your task"
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button onClick={handleUpdate} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer' }}>
                    Update
                </button>
            </div>
        </body>
    );
};

export default UpdateTask;