import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import axiosInstance from '~/services/axios';
import "./details.css";



const TaskDetails: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<{ name: string; contents: string } | null>(null);
  const navigate = useNavigate();
  const jwt = sessionStorage.getItem('jwt');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/${taskId}`);
        setTask(response.data.contents);
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
    navigate('/home');
  }

  // if (!task) {
  //   return <div>Loading...</div>;
  // }

  // return (
  //   <div className="task-details">
  //     <h2>{task.name}</h2>
  //     <p>{task.contents}</p>
  //     <button onClick={handleEdit} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer', marginBottom: '10px' }}>
  //         Edit
  //     </button>
  //     <button onClick={handleBack} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer', marginBottom: '10px' }}>
  //         Back to Home
  //     </button>
  //   </div>
  // );

  return (
    <div className="content_container">
      <div className="container header">
          <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <div className="col-md-3 mb-2 mb-md-0">
              <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                  <img src="black_square.svg" width="30px" height="30px"/>
              </a>
            </div>
      
            <div className="col-md-3 text-end">
              <button type="button" className="btn btn-primary me-2">Profile</button>
              <button type="button" className="btn btn-primary">Sign Out</button>
            </div>
          </header>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <h1>this is a task</h1>
          </div>
          <div className="col">

          </div>
        </div>
        <div className="row">
          <div className="col">
           <p>big text box for task description/details </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit magna sed suscipit dictum. Nulla facilisi. Cras vel ipsum at orci rhoncus pretium. Duis fermentum quam ornare tincidunt lobortis. Sed consequat massa vitae gravida luctus. Vivamus vitae ligula augue. Maecenas sed urna molestie, venenatis elit sit amet, pellentesque sapien. Nulla ut sollicitudin tortor. Suspendisse suscipit lectus non dapibus ornare. Aenean pulvinar, tortor vel rhoncus tempor, massa felis interdum arcu, non euismod justo enim vel mi. Nulla urna elit, dapibus id enim ut, pulvinar scelerisque tellus. Donec quis massa accumsan, volutpat dolor nec, consectetur ex. Proin enim eros, pellentesque eu egestas eget, scelerisque eget sapien. Proin eget tincidunt magna. Aliquam luctus nisi quis felis pretium congue. Nunc ut elit felis.</p>

            <p>Suspendisse eu maximus nunc. Maecenas nec maximus sapien. Cras interdum dui ut blandit interdum. Sed facilisis eu nunc in tincidunt. Donec ligula metus, hendrerit et nibh et, pellentesque vehicula arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris porttitor dui quis libero gravida ultrices. Donec feugiat tempus sem a fermentum. Nunc molestie pulvinar turpis, vel ullamcorper metus mattis sit amet. Fusce gravida mauris sodales, vulputate ligula sit amet, scelerisque elit. Nunc ac tempus felis. Donec quis erat sem. Vivamus sagittis maximus diam, nec euismod odio convallis a. </p>
            
            <p>Etiam iaculis fringilla fermentum. Duis elit arcu, euismod et porttitor at, efficitur sit amet lorem. Praesent tristique ante congue eros rutrum varius. Cras ullamcorper metus sollicitudin eleifend sagittis. Etiam tincidunt dapibus neque a faucibus. Mauris porttitor, elit vel sodales placerat, nisl lorem consequat sem, non fermentum lectus eros nec dui. Nunc sit amet nibh tincidunt ipsum venenatis feugiat vel sed odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;" </p>
          </div>
          <div className="col">
            <div className="row">
              <div className="col-2">
                <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                  <img src="green_square.svg" width="50px" height="50px"/>
                </a>
              </div>
              <div className="col">
                <h1>insert name</h1>
              </div>
            </div>
            <div className="row"></div>
            <div className="spacer"></div>
            <div className="col-2 status">
              <div className="btn-group">
                  <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Completed
                  </button>
                  <ul className="dropdown-menu">
                      <li><a className="dropdown-item active" href="#">Completed</a></li>
                      <li><a className="dropdown-item" href="#">In progress</a></li>
                      <li><a className="dropdown-item" href="#">Pending dependency</a></li>
                      <li><a className="dropdown-item" href="#">Not started</a></li>
                  </ul>
              </div> 
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
