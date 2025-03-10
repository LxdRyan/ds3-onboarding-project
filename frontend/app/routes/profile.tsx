import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '~/services/axios';

const Profile: React.FC = () => {
    const [username, setUsername] = useState(''); // User's name
    const [profilePicture, setProfilePicture] = useState<string>(''); // Current profile picture
    const [newProfilePicture, setNewProfilePicture] = useState<string | null>(null); // New profile picture
    const navigate = useNavigate();

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/users/0'); // Fetch user data from `/users` endpoint
                const user = response.data[0]; // Assuming the first user is the logged-in user
                setUsername(user.username);
                setProfilePicture(user.profilepicture); // Initialize current profile picture
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                alert('Unable to load profile data');
            }
        };

        fetchUserData();
    }, []);

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProfilePicture(reader.result as string); // Temporarily update new profile picture
            };
            reader.readAsDataURL(file);
        }
    };

    const handleConfirmChange = async () => {
        if (newProfilePicture) {
            try {
                // Send updated data to the database
                await axiosInstance.put('/users/1', { // Assume `1` is the user ID, update this dynamically if needed
                    username, // If username needs to be updated
                    profilepicture: newProfilePicture, // Push updated profile picture
                });

                setProfilePicture(newProfilePicture); // Update the profile picture locally
                alert('Profile picture updated successfully!');
                navigate('/'); // Redirect back to home
            } catch (error) {
                console.error('Failed to update profile picture:', error);
                alert('Failed to update profile picture');
            }
        }
    };

    const handleBackClick = () => {
        navigate('/home');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Profile Page</h1>
            <div style={styles.profileContainer}>
                <img src={profilePicture} alt="Profile" style={styles.profilePicture} />
                <h2 style={styles.username}>{username}</h2>
                <input type="file" onChange={handleProfilePictureChange} style={styles.fileInput} />
                {newProfilePicture && (
                    <button onClick={handleConfirmChange} style={styles.button}>
                        Confirm Change
                    </button>
                )}
                <button onClick={handleBackClick} style={styles.backButton}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'white',
        color: 'black',
    },
    header: {
        marginBottom: '20px',
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    profilePicture: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        marginBottom: '10px',
    },
    username: {
        marginBottom: '20px',
    },
    fileInput: {
        marginBottom: '10px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '10px',
    },
    backButton: {
        padding: '10px 20px',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Profile;
