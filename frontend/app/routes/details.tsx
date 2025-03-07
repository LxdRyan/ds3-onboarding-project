import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from '~/services/axios';



const TaskDetails: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<{ title: string; description: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error('Failed to fetch task:', error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleEdit = () => {
    navigate(`/update/${taskId}`);
  }

  const handleBack = () => {
    navigate('/');
  }

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-details">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <button onClick={handleEdit} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer', marginBottom: '10px' }}>
          Edit
      </button>
      <button onClick={handleBack} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer', marginBottom: '10px' }}>
          Back to Home
      </button>
    </div>
  );
};

export default TaskDetails;
